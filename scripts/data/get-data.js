
const getData = async () => {
    const secret_key = "secret-key"
    const username = "username"
    const password = "miemindata"

    const headers = new Headers()
    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`))

    const url = `https://miem-dns-dev.iddb.ru//${secret_key}/all-statuses`

    const response = await fetch(url, {
        method: 'GET',
        headers: headers
    })

    const tests = await response.json()

    var jsonBlock = {}

    jsonBlock["TopBlock"] = {}

    jsonBlock["TopBlock"]["Parameters"] = []

    jsonBlock["MainBlock"] = {}

    jsonBlock["MainBlock"]["Sections"] = []

    let domains = new Set()

    tests.map((test) => {
        switch (test.QueryType) {
            case "a":
                test.Records.a.map((record) => {
                    var aBlock = {}
                    aBlock = {
                        "GeneralName": test.DomainName,
                        "ProbeName": "A",
                        "ProbeSource": {
                            "Name": "NS A",
                            "ID": test.TestID
                        },
                        "ip": record,
                        "success": true
                    }

                    if (test.Error !== "") {
                        aBlock["success"] = false
                    }

                    jsonBlock["TopBlock"]["Parameters"].push(aBlock)

                })
                break;
            case "ns":
                test.Records.ns.map((record) => {
                    var nsBlock = {}
                    nsBlock = {
                        "GeneralName": record,
                        "ProbeName": "NS",
                        "ProbeSource": {
                            "Name": "NS",
                            "ID": test.TestID
                        },
                        "ip": test.ServerIP,
                        "success": true
                    }

                    if (test.Error !== "") {
                        nsBlock["success"] = false
                    }

                    jsonBlock["TopBlock"]["Parameters"].push(nsBlock)
                })

                break
            case "soa":
                var soaBlock = {}
                soaBlock = {
                    "GeneralName": test.DomainName,
                    "ProbeName": "SOA",
                    "ProbeSource": {
                        "Name": "NS SOA",
                        "ID": test.TestID
                    },
                    "ip": test.ServerIP,
                    "success": true
                }

                if (test.Error !== "") {
                    soaBlock["success"] = false
                }

                jsonBlock["TopBlock"]["Parameters"].push(soaBlock)

                break
            default:
                break;
        }
        if (!domains.has(test.DomainName)) {
            domains.add(test.DomainName)
        }
    })

    domains.values().forEach(value => {
        let section = {}

        section["GeneralName"] = value

        section["Parameters"] = []

        const domainData = tests.filter(test => test.DomainName === value)

        domainData.map(data => {
            if (data.QueryType === "ns") {
                data.Records.ns.map(ns => {
                    let newParameter = {
                        "GeneralName": ns,
                        "IP": data.ServerIP,
                        "Role": "",
                        "Probes": [{
                            "Name": "NS",
                            "ProbeSource": {
                                "Name": "NS",
                                "ID": data.TestID,
                                "interval": data.Interval || "5"
                            }
                        }]
                    }

                    section["Parameters"].push(newParameter)
                })
            }
        })

        jsonBlock["MainBlock"]["Sections"].push(section)
    })

    return jsonBlock

}

export { getData }