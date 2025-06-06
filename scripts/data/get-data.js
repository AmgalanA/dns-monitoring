/**
 * Асинхронно получает данные о DNS-тестах с сервера и формирует структурированный JSON-объект
 * @returns {Promise<Object>} Объект с данными тестов, содержащий TopBlock и MainBlock
 */
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

                    // if (test.Protocol === "dot") {
                    //     aBlock["ProbeName"] = aBlock["ProbeName"] + "-DoT"
                    // }

                    aBlock["ProbeName"] = aBlock["ProbeName"] + "-" + test.Protocol


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

                    // if (test.Protocol === "dot") {
                    // nsBlock["ProbeName"] = nsBlock["ProbeName"] + "-DoT"
                    // }
                    nsBlock["ProbeName"] = nsBlock["ProbeName"] + "-" + test.Protocol

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

                // if (test.Protocol === "dot") {
                //     soaBlock["ProbeName"] = soaBlock["ProbeName"] + "-DoT"
                // }

                soaBlock["ProbeName"] = soaBlock["ProbeName"] + "-" + test.Protocol

                if (test.Error !== "") {
                    soaBlock["success"] = false
                }

                jsonBlock["TopBlock"]["Parameters"].push(soaBlock)

                break
            case "cert":
                var certBlock = {}

                const records = test.Records.dns_names

                records.map(record => {
                    certBlock = {
                        "GeneralName": record,
                        "ProbeName": "Cert",
                        "ProbeSource": {
                            "Name": "NS Cert",
                            "ID": test.TestID
                        },
                        "ip": test.ServerIP,
                        "success": true
                    }

                    if (test.Error !== "") {
                        certBlock["success"] = false
                    }

                    jsonBlock["TopBlock"]["Parameters"].push(certBlock)
                })

            default:
                break;
        }
        if (!domains.has(test.DomainName)) {
            domains.add(test.DomainName)
        }
    })
    let servers = {}

    let domainValues = [] 
    domains.values().forEach(value => domainValues.push(value))
    domainValues.sort()

    domainValues.forEach(value => {
        let section = {}

        section["GeneralName"] = value

        section["Parameters"] = []

        const domainData = tests.filter(test => test.DomainName === value)

        domainData.map(data => {

            if (data.ServerIP[0] === "[") {
                data.ServerIP = data.ServerIP.slice(1, data.ServerIP.length - 1)
            }

            if (!Object.keys(servers).includes(data.ServerIP)) {
                servers[data.ServerIP] = []
            }

            if (data.QueryType === "ns") {
                data.Records.ns.map(ns => {
                    let newParameter = {
                        "GeneralName": ns,
                        "IP": data.ServerIP,
                        "Role": "",
                        "Probes": [{
                            "Name": "NS: " + ns,
                            "ProbeSource": {
                                "Name": ns,
                                "ID": data.TestID,
                                "interval": data.Interval || "5"
                            }
                        }]
                    }

                    servers[data.ServerIP].push(newParameter)
                })
            }

            if (data.QueryType === "a") {
                data.Records.a.map(a => {
                    if (!servers[data.ServerIP].map(param => param.GeneralName).includes(a)) {
                        let newParameter = {
                            "GeneralName": a,
                            "IP": data.ServerIP,
                            "Role": "",
                            "Probes": [{
                                "Name": "A: " + a,
                                "ProbeSource": {
                                    "Name": a,
                                    "ID": data.TestID,
                                    "interval": data.Interval || "5"
                                }
                            }]
                        }
    
                        servers[data.ServerIP].push(newParameter)
                    }

                })
            }

            if (data.QueryType === "soa") {
                let name = ""

                Object.values(data.Records).map(soa => {
                    name = name + soa
                })

                let newParameter = {
                    "GeneralName": name,
                    "IP": data.ServerIP,
                    "Role": "",
                    "Probes": [{
                        "Name": "SOA",
                        "ProbeSource": {
                            "Name": name,
                            "ID": data.TestID,
                            "interval": data.Interval || "5"
                        }
                    }]
                }

                servers[data.ServerIP].push(newParameter)
            }

            if (data.QueryType === "cert") {
                data.Records.dns_names.map(dns_name => {
                    let newParameter = {
                        "GeneralName": dns_name,
                        "IP": data.ServerIP,
                        "Role": "",
                        "Probes": [{
                            "Name": "Cert - " + dns_name,
                            "ProbeSource": {
                                "Name": dns_name,
                                "ID": data.TestID,
                                "interval": data.Interval || "5"
                            }
                        }]
                    }

                    servers[data.ServerIP].push(newParameter)
                })
            }

            Object.keys(servers).map((key) => {

                const probesData = servers[key]
                probesData.map(probeData => {

                    const probe = {
                        "Name": probeData.Probes[0].Name,
                        "ProbeSource": probeData.Probes[0].ProbeSource
                    }

                    if (section["Parameters"].length === 0) {
                        section["Parameters"].push(probeData)
                    }
                    else if (!section["Parameters"].map(param => param.IP).includes(probeData.IP)) {
                        section["Parameters"].push(probeData)
                    }
                    else {
                        section["Parameters"].map((param, index) => {
                            if (param.IP === probeData.IP) {
                                section["Parameters"][index]["Probes"].push(probe)
                            }
                        })
                    }

                })

            })

        })

        jsonBlock["MainBlock"]["Sections"].push(section)
    })

    return jsonBlock

}

export { getData }