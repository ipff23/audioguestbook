import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '@/modules/core/services/firebase';
import { getFileSha1 } from '@/modules/core/helpers/utils';

export const readAllTracks = async ({ bookId }) => {
    const q = query(collection(db, 'tracks'), where('bookId', '==', bookId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};

export const uploadTrack = async (path, fileName, file) => {
    const storageRef = ref(storage, `${path}${fileName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};

export const updateTrack = async ({ nanoid, index, name }) => {
    const trackRef = doc(db, 'tracks', nanoid);
    const trackData = { index, name };

    await updateDoc(trackRef, trackData);
    return trackData;
};

export const createTrack = async ({ bookId, index, nanoid, name, duration, file }) => {
    const docRef = doc(collection(db, 'tracks'), nanoid);

    const hash = await getFileSha1(file);
    const fileName = `${hash}.mp3`;
    const trackPath = await uploadTrack(`tracks/${bookId}/`, fileName, file);

    const trackData = {
        hash,
        url: trackPath,
        bookId,
        index,
        nanoid,
        name,
        duration,
    };

    await setDoc(docRef, trackData);

    return trackData;
};

export const saveTrack = async ({ bookId, index, name, duration, track }) => {
    if (track.type === 'new') {
        return await createTrack({
            bookId,
            index,
            name,
            duration,
            nanoid: track.nanoid,
            file: track.file,
        });
    }

    if (track.type === 'stored') {
        return await updateTrack({
            nanoid: track.nanoid,
            index,
            name,
        });
    }

    throw new Error('Invalid track type');
};

export const removeMultipleTracks = async (trackIds = []) => {
    if (!trackIds.length) return;
    const q = query(collection(db, 'tracks'), where('nanoid', 'in', trackIds));
    const snapshot = await getDocs(q);

    const deletes = snapshot.docs.map(d => deleteDoc(doc(db, 'tracks', d.id)));
    await Promise.all(deletes);
};

export const readAllTracksQuery = ({ bookId, ...args } = {}) => {
    return {
        ...args,
        queryKey: ['tracks'],
        queryFn: async () => {
            const tracks = await readAllTracks({ bookId });
            return tracks;
        },
    };
};

export const saveTrackMutation = ({ ...args } = {}) => {
    return {
        ...args,
        mutationFn: async ({ bookId, index, name, duration, track }) => {
            const trackData = await saveTrack({ bookId, index, name, duration, track });
            return trackData;
        },
    };
};

export const removeMultipleTracksMutation = ({ ...args } = {}) => {
    return {
        ...args,
        mutationFn: async (trackIds = []) => {
            await removeMultipleTracks(trackIds);
        },
    };
};
