export const fileListToArray = (fileList: FileList | null): File[] => {
    if (fileList === null) {
        return [];
    }

    const files: File[] = [];

    for (let i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i) as File);
    }

    return files;
};
