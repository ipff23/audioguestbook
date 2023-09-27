export const hasAllowedType = (file: File, allowedTypes: string): boolean => {
    return allowedTypes.split(',').some(type => type.trim() === file?.type);
};
