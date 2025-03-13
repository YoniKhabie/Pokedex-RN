export function capitalizeFirstLetter(str: string) {
    if (str.length === 0) return str; // Handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export function eplaceHyphenWithSpace(str: string) {
    return str.replace(/-/g, " ");
}

export function replaceSpaceWithHyphen(str: string) {
    const res = str.replace("-", " ");
    return res;
}
