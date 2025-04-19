
const showTests = (blocks) => {
    const testsContainer = document.getElementById('tests-container')
    testsContainer.innerHTML = '';
    const tests = blocks.TopBlock.Parameters

    for (let i = 0; i < tests.length; i += 5) {
        const row = document.createElement('div')
        row.className = 'row'

        let rowOfTests = tests.slice(i, i+5)

        rowOfTests.forEach(test => {
            const testDiv = document.createElement('div');
            testDiv.className = 'test-div';
    
            if (test.success === true) {
                testDiv.style.backgroundColor = '#08fc64';
            } else {
                testDiv.style.backgroundColor = '#ff6464';
            }

            const headingContainer = document.createElement('div')
            headingContainer.className = 'heading-container'
    
            const nsName = document.createElement('h2')
            nsName.textContent = test.GeneralName
            
            const typeName = document.createElement('h3')
            typeName.textContent = test.ProbeName;

            headingContainer.appendChild(nsName)
            headingContainer.appendChild(typeName)
    
            const ipName = document.createElement('p')
            ipName.textContent = test.ip;
    
            testDiv.appendChild(headingContainer)
            testDiv.appendChild(ipName)

            row.appendChild(testDiv)
        })

        testsContainer.appendChild(row)
    }
}

export { showTests }

// #08fc64
// #ff6464
