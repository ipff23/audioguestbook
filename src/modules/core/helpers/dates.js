export const parseTimestamp = ({ seconds }) => {
    if (!seconds) return null;
    return new Date(seconds * 1000);
};
