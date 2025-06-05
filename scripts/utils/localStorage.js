/**
 * Сохраняет объект данных в локальное хранилище под ключом "DATA"
 * @param {Object} blocks - Объект данных для сохранения
 * @returns {void} Ничего не возвращает
 */
function saveToLocalStorage(blocks) {
    localStorage.setItem("DATA", JSON.stringify(blocks))
}

/**
 * Получает данные из локального хранилища по ключу "DATA"
 * @returns {string|null} Строку JSON с данными или null, если данные отсутствуют
 */
function getFromLocalStorage() {
    return localStorage.getItem("DATA")
}

export { saveToLocalStorage, getFromLocalStorage }