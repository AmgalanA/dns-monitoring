import { shuffle } from "../utils/shuffle.js";

/**
 * Отображает до 10 тестов в HTML-контейнере с идентификатором 'tests-container', группируя их по 5 в строке
 * @param {Object} blocks - Объект с данными, содержащий TopBlock с параметрами тестов
 * @returns {void} Ничего не возвращает
 */
const showTests = (blocks) => {
    const testsContainer = document.getElementById('tests-container')
    testsContainer.innerHTML = '';
    const tests = shuffle(blocks.TopBlock.Parameters).slice(0, 10)

    for (let i = 0; i < tests.length; i += 5) {
        const row = document.createElement('div')
        row.className = 'row'
        
        let rowOfTests = tests.slice(i, i + 5)
        
        rowOfTests.forEach(test => {
            const testDiv = document.createElement('div');
            testDiv.className = 'test-div';

            if (test.success === true || test.success === "true") {
                testDiv.style.backgroundColor = '#08fc64';
            } else {
                testDiv.style.backgroundColor = '#ff6464';
            }

            const headingContainer = document.createElement('div')
            headingContainer.className = 'heading-container'

            const nsName = document.createElement('h2')
            nsName.textContent = test.GeneralName || "N/A"

            const typeName = document.createElement('h3')
            typeName.textContent = test.ProbeName;

            headingContainer.appendChild(nsName)
            headingContainer.appendChild(typeName)

            const footerContainer = document.createElement('div')

            footerContainer.className = "footer-container"

            const ipName = document.createElement('p')
            ipName.textContent = test.ip;

            const lamp = document.createElement('p')
            lamp.className = "lamp"
            lamp.id = "lamp" + test.ip + test.GeneralName + test.GeneralName
            lamp.innerHTML = "💡"

            footerContainer.appendChild(ipName)
            footerContainer.appendChild(lamp)

            testDiv.appendChild(headingContainer)
            testDiv.appendChild(footerContainer)

            // lamp.addEventListener("click", () => {
            //     if (testDiv.innerHTML === "") {
            //         testDiv.appendChild(headingContainer)
            //         testDiv.appendChild(footerContainer)
            //     } else {
            //         const descriptionDiv = document.createElement("div")
            //         descriptionDiv.className = "description-container"
            //         let isAvailable = "доступен"

            //         if (test.success !== true) {
            //             isAvailable = "недоступен"
            //         }

            //         const description = document.createElement("p")

            //         description.innerHTML = "Авторитативный сервер " + test.GeneralName + " c ip адресом " +
            //             test.ip + " " + isAvailable + " через " + test.ProbeName;

            //         const turnBackImg = document.createElement("img")
            //         turnBackImg.src = "../../static/images/icon-left-turn.png"
            //         testDiv.innerHTML = ""

            //         turnBackImg.addEventListener("click", () => {
            //             testDiv.innerHTML = ""
            //             testDiv.appendChild(headingContainer)
            //             testDiv.appendChild(footerContainer)
            //         })

            //         descriptionDiv.appendChild(description)
            //         descriptionDiv.appendChild(turnBackImg)

            //         testDiv.appendChild(descriptionDiv)
            //     }
            // })

            row.appendChild(testDiv)
        })

        testsContainer.appendChild(row)

    }
}

export { showTests }

// #08fc64
// #ff6464
