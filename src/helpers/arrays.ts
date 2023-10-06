import { randomInt } from './maths';

export function fileListToArray(fileList: FileList | null): File[] {
    if (fileList === null) {
        return [];
    }

    const files: File[] = [];

    for (let i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i) as File);
    }

    return files;
}

export function removeAt<T>(arr: T[], index: number): T[] {
    const copy = [...arr];
    copy.splice(index, 1);
    return copy;
}

export function bagOfItems<T>(initialItems: T[] = []) {
    let items = initialItems;
    return {
        pick(shuffle = false) {
            if (shuffle) {
                return items.shift();
            }

            const randomIndex = randomInt(0, items.length - 1);
            const randomItem = items[randomIndex];
            items = removeAt(items, randomIndex);
            return randomItem;
        },
        fill(newItems: T[]) {
            items = newItems;
        },
        empty() {
            items = [];
        },
        size() {
            return items.length;
        },
    };
}
