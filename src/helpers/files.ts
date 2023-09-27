export const MimeTypesMap = new Map<string, string>([
    ['mp3', 'audio/mpeg'],
    ['png', 'image/png'],
    ['jpg', 'image/jpeg'],
    ['jpeg', 'image/jpeg'],
]);

export const getMimeType = (extension: string | undefined): string => {
    if (!extension) return 'text/plain';
    return MimeTypesMap.get(extension) ?? 'text/plain';
};

export const createFileFromUrl = async (url: string): Promise<File> => {
    const name = url.split('/').at(-1) as string;
    const extension = name?.split('.').at(-1);
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = { type: getMimeType(extension) };
    const file = new File([data], name, metadata);
    return file;
};
