export const secondsToMin = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = `${Math.floor(seconds % 60)}`.padStart(2, '0');
    return `${mins}:${secs}`;
};
