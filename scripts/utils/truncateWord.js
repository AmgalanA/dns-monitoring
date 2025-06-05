/**
 * Обрезает строку до указанной длины, добавляя "..." в конец, если строка превышает максимальную длину
 * @param {string} word - Строка для обрезки
 * @param {number} maxLength - Максимальная длина строки
 * @returns {string} Обрезанная строка или исходная строка, если её длина меньше или равна maxLength
 */
export const truncateWord = (word, maxLength) => {
    if (word.length > maxLength) {
        return word.slice(0, maxLength) + "...";
    }
    return word;
}