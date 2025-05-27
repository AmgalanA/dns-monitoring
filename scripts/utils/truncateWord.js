export const truncateWord = (word, maxLength) => {
    if (word.length > maxLength) {
        return word.slice(0, maxLength) + "..."; // you can change "..." to ".." or "…"
    }
    return word;
}