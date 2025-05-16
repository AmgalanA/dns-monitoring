import { newBlocks } from "../../static/blocks/newBlocks.js";

const buildSchedule = (blocks) => {
    const intervals = new Object()
    const schedule = {}

    for (let i = 0; i < blocks.MainBlock.Sections.length; i++) {
        for (let j = 0; j < blocks.MainBlock.Sections[i].Parameters.length; j++) {

            for (let k = 0; k < blocks.MainBlock.Sections[i].Parameters[j].Probes.length; k++) {
                const id = blocks.MainBlock.Sections[i].Parameters[j].Probes[k].ProbeSource.ID
                const interval = blocks.MainBlock.Sections[i].Parameters[j].Probes[k].ProbeSource.interval

                intervals[id] = interval
            }
        }
    }

    const minInterval = Math.min(...Object.values(intervals))

    Object.entries(intervals).forEach(([testId, interval]) => {
        schedule[testId] = interval / minInterval;
    });

    return { schedule, minInterval }
}

const { schedule, minInterval } = buildSchedule(newBlocks)

let counter = 0

const mainInterval = () => setInterval(() => {
    counter++

    const testsToFetch = Object.entries(schedule)
    .filter(([testId, everyXTicks]) => counter % everyXTicks === 0)
    .map(([testId]) => testId);

    if (testsToFetch.length > 0) {
        fetchTestResults(testsToFetch)
          .then(updateUI)
          .catch(handleError);
      }

    if (counter >= 60) counter = 0;
}, minInterval * 1000)



export { mainInterval }