export const parseTimestamp = ({ seconds = 0 } = {}) => {
    if (!seconds) return null;
    return new Date(seconds * 1000);
};
