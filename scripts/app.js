import { showTests } from "./tests/tests.js";
import { showAreas } from "./areas/areas.js";

import { mainInterval } from "./timer/timer.js";

import { getData } from "./data/get-data.js";

// Main Variables
let counter = 0

function saveToLocalStorage(blocks) {
    localStorage.setItem("DATA", JSON.stringify(blocks))
}

function getFromLocalStorage() {
    return localStorage.getItem("DATA")
}

async function fetchZones() {
    const res = Math.floor(Math.random() * 4)

    // const data = JSON.parse(getFromLocalStorage())

    const data = await getData()
    console.log(data)

    // if (data) {
    //     showTests(blocks)
    //     showAreas(blocks)
    // } else {
    //     switch (res) {
    //         case 0:
    //             saveToLocalStorage(blocks)
    //             showTests(blocks)
    //             showAreas(blocks)
    //             break;
    //         case 1:
    //             saveToLocalStorage(blocks)
    //             showTests(secondBlocks)
    //             showAreas(secondBlocks)
    //             break;
    //         case 2:
    //             saveToLocalStorage(blocks)
    //             showTests(thirdBlocks)
    //             showAreas(thirdBlocks)
    //             break;
    //         case 3:
    //             saveToLocalStorage(blocks)
    //             showTests(forthBlocks)
    //             showAreas(forthBlocks)
    //             break;
    //     }
    // }

    // showTests(newBlocks)
    // showAreas(newBlocks)


    return 0;
}

mainInterval()

// setInterval(fetchZones, 1000)
fetchZones()


