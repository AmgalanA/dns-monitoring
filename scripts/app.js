import { showTests } from "./tests/tests.js";
import { showAreas } from "./areas/areas.js";

import { handleTimer } from "./timer/timer.js";

import { getData } from "./data/get-data.js";
import { getFromLocalStorage, saveToLocalStorage } from "./utils/localStorage.js";

let counter = 0

const handleInterface = () => {
    counter += 1
    handleTimer()

    if (counter % 2 === 0) {
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

const refreshButton = document.getElementById("refresh-button")

refreshButton.addEventListener('click', () => {
    const monitoringDiv = document.getElementById('monitoring')
    const testsContainer = document.getElementById('tests-container')
    const areasContainer = document.getElementById('areas-container')
    const activeAreaWrapper = document.getElementById('active-area-wrapper')
    
    testsContainer.innerHTML = ''
    areasContainer.innerHTML = ''
    activeAreaWrapper.innerHTML = ''

    const loaderContainer = document.createElement('div')
    loaderContainer.className = 'loader-container'

    const loader = document.createElement('div')
    loader.className = 'loader'

    loaderContainer.appendChild(loader)
    monitoringDiv.appendChild(loaderContainer)

    setTimeout(() => {
        loaderContainer.classList.add('hidden');
        fetchZones()
    }, 1000);
    
})

let data = JSON.parse(getFromLocalStorage())

if (data) {
    showTests(data)
    showAreas(data)
}

setInterval(handleInterface, 1000)

// fetchZones()
