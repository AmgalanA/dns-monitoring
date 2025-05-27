function saveToLocalStorage(blocks) {
    localStorage.setItem("DATA", JSON.stringify(blocks))
}

function getFromLocalStorage() {
    return localStorage.getItem("DATA")
}

export { saveToLocalStorage, getFromLocalStorage }