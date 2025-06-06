import { makeJSONUnique } from "../utils/makeJSONUnique.js"
import { shuffle } from "../utils/shuffle.js"

let flag = false

/**
 * Отображает области в HTML-контейнере с идентификатором 'areas-container' и активирует обработчики кликов
 * @param {Object} blocks - Объект с данными, содержащий MainBlock с секциями
 * @returns {boolean} Возвращает true после успешного выполнения
 */
const showAreas = (blocks) => {
    const areasContainer = document.getElementById('areas-container')
    areasContainer.innerHTML = ''

    const activeAreaFromLS = localStorage.getItem('active-zone')

    for (let i = 0; i < blocks.MainBlock.Sections.length; i++) {
        const area = blocks.MainBlock.Sections[i]

        const areaDiv = document.createElement('div')
        areaDiv.className = 'area-div'

        if (area.GeneralName === activeAreaFromLS) {
            areaDiv.id = 'area-active'

        }

        // if (i === 0) {
        //     areaDiv.id = 'area-active'
        // }

        // if (i === blocks.MainBlock.Sections.length - 1 && i !== 0) {
        //     areaDiv.id = 'area-last'
        // }

        const areaHeading = document.createElement('h2')
        areaHeading.textContent = area.GeneralName

        areaDiv.appendChild(areaHeading)

        showArea(area)

        areaDiv.addEventListener('click', () => {
            const active = document.getElementById('area-active')
            
            if (active) {
                active.removeAttribute('id')
            }

            areaDiv.id = 'area-active'

            localStorage.setItem('active-zone', areaDiv.textContent)

            showActiveArea(blocks)
        })

        areasContainer.appendChild(areaDiv)
    }
    // showActiveArea(blocks)

}

/**
 * Находит информацию об области по её имени
 * @param {string} name - Имя области
 * @param {Object} blocks - Объект с данными, содержащий MainBlock с секциями
 * @returns {Object|undefined} Объект области или undefined, если область не найдена
 */
const getAreaInfoByName = (name, blocks) => {
    for (let i = 0; i < blocks.MainBlock.Sections.length; i++) {
        if (name === blocks.MainBlock.Sections[i].GeneralName) {
            return blocks.MainBlock.Sections[i]
        }
    }
}

/**
 * Отображает информацию об активной области в HTML-контейнере с идентификатором 'active-area-wrapper'
 * @param {Object} blocks - Объект с данными, содержащий MainBlock с секциями
 * @returns {void} Ничего не возвращает
 */
const showActiveArea = (blocks) => {
    const activeAreaDiv = document.getElementById('area-active')

    const activeAreaInfo = getAreaInfoByName(activeAreaDiv.textContent, blocks)

    const areaInfoContainer = document.getElementById('active-area-wrapper')
    areaInfoContainer.innerHTML = ''

    let numOfCols = 5
    const screenWidth = window.innerWidth

    if (screenWidth <= 1024) {
        numOfCols = 2
    } else if (screenWidth < 1750) {
        numOfCols = 3
    } else if (screenWidth <= 1920) {
        numOfCols = 4
    }

    // activeAreaInfo.Parameters = shuffle(activeAreaInfo.Parameters).slice(0, 15)

    for (let i = 0; i < activeAreaInfo.Parameters.length; i += numOfCols) {

        const servers = activeAreaInfo.Parameters.slice(i, i + numOfCols)

        const row = document.createElement("div")
        row.className = 'active-area-row'

        servers.forEach(server => {
            const activeAreaContaier = document.createElement('div')
            activeAreaContaier.className = 'active-area-container'

            const activeAreaHeading = document.createElement('h1')
            activeAreaHeading.textContent = server.IP + " " + server.Role

            const recordsContainer = document.createElement('div')
            recordsContainer.className = 'records-container'

            server.Probes = shuffle(makeJSONUnique(server.Probes)).slice(0, 15)

            for (let j = 0; j < server.Probes.length; j++) {
                const record = server.Probes[j]

                const recordDiv = document.createElement('div')
                recordDiv.className = 'record-div'

                const recordText = document.createElement('p')

                // if (record.domain === null) {
                // recordText.textContent = record.type
                // } else {
                // recordText.textContent = record.domain + "/" + record.type
                // }

                if (record.Name === "SOA" && !flag) {
                    flag = true
                } else {
                    recordText.textContent = record.Name

                    recordDiv.appendChild(recordText)

                    recordsContainer.append(recordDiv)
                }
            }

            activeAreaContaier.appendChild(activeAreaHeading)
            activeAreaContaier.appendChild(recordsContainer)

            row.appendChild(activeAreaContaier)
        })

        areaInfoContainer.appendChild(row)
    }
}

const showArea = (activeAreaInfo) => {
    const areaInfoContainer = document.getElementById('active-area-wrapper')

    const newAreaContainer = document.createElement('div')
    newAreaContainer.className = 'new-area-container'

    let numOfCols = 5
    const screenWidth = window.innerWidth

    if (screenWidth <= 1024) {
        numOfCols = 2
    } else if (screenWidth < 1750) {
        numOfCols = 3
    } else if (screenWidth <= 1920) {
        numOfCols = 4
    }

    // activeAreaInfo.Parameters = shuffle(activeAreaInfo.Parameters).slice(0, 15)

    for (let i = 0; i < activeAreaInfo.Parameters.length; i += numOfCols) {

        const servers = activeAreaInfo.Parameters.slice(i, i + numOfCols)

        const row = document.createElement("div")
        row.className = 'active-area-row'

        servers.forEach(server => {
            const activeAreaContaier = document.createElement('div')
            activeAreaContaier.className = 'active-area-container'

            const activeAreaHeading = document.createElement('h1')
            activeAreaHeading.textContent = server.IP + " " + server.Role

            const recordsContainer = document.createElement('div')
            recordsContainer.className = 'records-container'

            server.Probes = shuffle(makeJSONUnique(server.Probes)).slice(0, 15)

            for (let j = 0; j < server.Probes.length; j++) {
                const record = server.Probes[j]

                const recordDiv = document.createElement('div')
                recordDiv.className = 'record-div'

                const recordText = document.createElement('p')

                // if (record.domain === null) {
                // recordText.textContent = record.type
                // } else {
                // recordText.textContent = record.domain + "/" + record.type
                // }

                if (record.Name === "SOA" && !flag) {
                    flag = true
                } else {
                    recordText.textContent = record.Name

                    recordDiv.appendChild(recordText)

                    recordsContainer.append(recordDiv)
                }
            }

            activeAreaContaier.appendChild(activeAreaHeading)
            activeAreaContaier.appendChild(recordsContainer)

            row.appendChild(activeAreaContaier)
        })

        newAreaContainer.appendChild(row)

    }
    areaInfoContainer.appendChild(newAreaContainer)
}

export { showAreas }