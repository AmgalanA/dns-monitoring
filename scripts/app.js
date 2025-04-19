import { showTests } from "./tests/tests.js";
import { showAreas } from "./areas/areas.js";
import { blocks } from "../static/blocks.js";
import { secondBlocks } from "../static/secondBlocks.js";
import { thirdBlocks } from "../static/thirdBlocks.js"

function fetchZones() {
    const res = Math.floor(Math.random() * 3)
    if (res === 0) {
        showTests(blocks)
        showAreas(blocks)
    } else if (res == 1) {
        showTests(secondBlocks)
        showAreas(secondBlocks)
    } else {
        showTests(thirdBlocks)
        showAreas(thirdBlocks)
    }

    return 0;
}

setInterval(fetchZones, 1000)



