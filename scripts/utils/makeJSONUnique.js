
/**
 * Удаляет дубликаты из массива объектов, преобразуя их в уникальный массив
 * @param {Array<Object>} sections - Массив объектов для обработки
 * @returns {Array<Object>} Массив уникальных объектов
 */

export const makeJSONUnique = (sections) => {
    return [...new Set(
        sections.map(item => JSON.stringify(item))
    )].map(item => JSON.parse(item));
}