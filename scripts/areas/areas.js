

const showAreas = (blocks) => {
    const areasContainer = document.getElementById('areas-container')
    areasContainer.innerHTML = ''

    for (let i = 0; i < blocks.MainBlock.Sections.length; i++) {
        const area = blocks.MainBlock.Sections[i]

        const areaDiv = document.createElement('div')
        areaDiv.className = 'area-div'

        if (i === 0) {
            areaDiv.id = 'area-active'
        }

        if (i === blocks.MainBlock.Sections.length - 1 && i !== 0) {
            areaDiv.id = 'area-last'
        }

        const areaHeading = document.createElement('h2')
        areaHeading.textContent = area.GeneralName

        areaDiv.appendChild(areaHeading)

        areaDiv.addEventListener('click', () => {
            const active = document.getElementById('area-active')
            active.removeAttribute('id')

            areaDiv.id = 'area-active'

            localStorage.setItem('active-zone', areaDiv.textContent)

            showActiveArea(blocks)
        })

        areasContainer.appendChild(areaDiv)
    }
    showActiveArea(blocks)
}

const getAreaInfoByName = (name, blocks) => {
    for (let i = 0; i < blocks.MainBlock.Sections.length; i++) {
        if (name === blocks.MainBlock.Sections[i].GeneralName) {
            return blocks.MainBlock.Sections[i]
        }
    }
}

const showActiveArea = (blocks) => {
    const activeAreaDiv = document.getElementById('area-active')

    const activeAreaInfo = getAreaInfoByName(activeAreaDiv.textContent, blocks)

    const areaInfoContainer = document.getElementById('active-area-wrapper')
    areaInfoContainer.innerHTML = ''

    for (let i = 0; i < activeAreaInfo.Parameters.length; i+=5) {

        const servers = activeAreaInfo.Parameters.slice(i, i + 5)

        const row = document.createElement("div")
        row.className = 'active-area-row'

        servers.forEach(server => {
            const activeAreaContaier = document.createElement('div')
            activeAreaContaier.className = 'active-area-container'
    
            const activeAreaHeading = document.createElement('h1')
            activeAreaHeading.textContent = server.IP + " " + server.Role
    
            const recordsContainer = document.createElement('div')
            recordsContainer.className = 'records-container'
    
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
    
                recordText.textContent = record.Name
    
                recordDiv.appendChild(recordText)
    
                recordsContainer.append(recordDiv)
            }
    
            activeAreaContaier.appendChild(activeAreaHeading)
            activeAreaContaier.appendChild(recordsContainer)

            row.appendChild(activeAreaContaier)
        })

        areaInfoContainer.appendChild(row)
    }

}

export { showAreas }