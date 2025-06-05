import { showTests } from "./tests/tests.js";
import { showAreas } from "./areas/areas.js";

import { handleTimer } from "./timer/timer.js";

import { getData } from "./data/get-data.js";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/localStorage.js";

let counter = 0

const handleInterface = () => {
    counter += 1
    handleTimer()

    if (counter % 3 === 0) {
        counter = 0
        fetchZones()
    }
}
/**
 * Асинхронно получает данные, сохраняет их в локальное хранилище и отображает тесты и области
 * @returns {Promise<number>} Число 0 после успешного выполнения
 */
async function fetchZones() {
    
    let data = await getData()
    saveToLocalStorage(data)

    showTests(data)
    showAreas(data)

    window.addEventListener('resize', () => {
        showAreas(data)
    })

    // showTests(blocks)
    // showAreas(blocks)

    return 0;
}

// let data = JSON.parse(getFromLocalStorage())

// if (data) {
//     showTests(data)
//     showAreas(data)
// }

// setInterval(handleInterface, 1000)

fetchZones()
