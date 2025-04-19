import { showTests } from "./tests/tests.js";
import { showAreas } from "./areas/areas.js";
import { blocks } from "../static/blocks/blocks.js";
import { secondBlocks } from "../static/blocks/secondBlocks.js";
import { thirdBlocks } from "../static/blocks/thirdBlocks.js"
import { forthBlocks } from "../static/blocks/forthBlocks.js";

function fetchZones() {
    const res = Math.floor(Math.random() * 4)

    switch (res) {
        case 0:
            showTests(blocks)
            showAreas(blocks)
            break;
        case 1:
            showTests(secondBlocks)
            showAreas(secondBlocks)
            break;
        case 2:
            showTests(thirdBlocks)
            showAreas(thirdBlocks)
            break;
        case 3:
            showTests(forthBlocks)
            showAreas(forthBlocks)
            break;
    }

    return 0;
}

setInterval(fetchZones, 1000)



