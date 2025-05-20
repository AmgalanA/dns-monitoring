

const getData = async () => {
    try {
        const secret_key = "secret-key"
        const username = "username"
        const password = "miemindata"

        const headers = new Headers()
        headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`))

        const url = `https://62.76.121.123/${secret_key}/all-statuses`

        fetch(url, {
            method: 'GET',
            headers: headers
        }).then(res => {
            console.log("RES: ", res)
        })
        
    } catch (error) {
        console.error("ERROR: ", error)
    }
}

export { getData }