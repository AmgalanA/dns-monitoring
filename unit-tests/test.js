import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!DOCTYPE html><p>Hello</p>`, { url: "https://example.com" });

global.window = dom.window;
global.document = dom.window.document;

global.Headers = class {
    constructor() {
        this.map = {};
    }
    set(k, v) {
        this.map[k] = v;
    }
};

global.btoa = (str) => Buffer.from(str).toString("base64");

global.fetch = async function () {
    return {
        async json() {
            return [
                {
                    TestID: "1",
                    DomainName: "example.com",
                    QueryType: "a",
                    Protocol: "udp",
                    ServerIP: "192.0.2.10",
                    Records: { a: ["192.0.2.10"] },
                    Error: ""
                },
                {
                    TestID: "2",
                    DomainName: "example.com",
                    QueryType: "ns",
                    Protocol: "dot",
                    ServerIP: "[192.0.2.20]",
                    Records: { ns: ["ns1.example.com"] },
                    Error: ""
                }
            ];
        }
    };
};

const makeJSONUnique = (sections) => {
    return [...new Set(
        sections.map(item => JSON.stringify(item))
    )].map(item => JSON.parse(item));
}

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

    domains.values().forEach(value => {
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

function mockFetchSuccess() {
    return async function (url, options) {
        return {
            async json() {
                return createMockTestData();
            }
        };
    };
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        console.error(`❌ ${message}: expected ${expected}, got ${actual}`);
    } else {
        console.log(`✅ ${message}`);
    }
}

async function runMockedTests() {
    window.fetch = mockFetchSuccess();

    const result = await getData();

    assertEqual(result.TopBlock.Parameters.length, 2, "TopBlock should have 2 entries");

    const certProbe = result.TopBlock.Parameters.find(p => p.ProbeName.startsWith("Cert"));
    assertEqual(!!certProbe, false, "Should contain a Cert probe");

    const soaProbe = result.TopBlock.Parameters.find(p => p.ProbeName.startsWith("SOA"));
    assertEqual(soaProbe, undefined, "SOA probe should be unsuccessful due to error");

    assertEqual(result.MainBlock.Sections.length, 1, "MainBlock should have 1 section for 1 domains");

    const hasNSSection = result.MainBlock.Sections.some(section =>
        section.Parameters.some(param => param.Probes.some(probe => probe.Name.includes("NS")))
    );
    assertEqual(hasNSSection, true, "Should include NS probes in MainBlock");
}

async function testSuccessFlag() {
    global.fetch = async () => ({
        async json() {
            return [
                {
                    TestID: "3",
                    DomainName: "example.com",
                    QueryType: "a",
                    Protocol: "udp",
                    ServerIP: "192.0.2.30",
                    Records: { a: ["192.0.2.30"] },
                    Error: "Timeout"
                }
            ];
        }
    });

    const result = await getData();
    const param = result.TopBlock.Parameters.find(p => p.ProbeSource.ID === "3");
    assertEqual(param.success, false, "Parameter with error should have success = false");
}

async function testProbeNameProtocolSuffix() {
    global.fetch = async () => ({
        async json() {
            return [
                {
                    TestID: "4",
                    DomainName: "example.com",
                    QueryType: "a",
                    Protocol: "tcp",
                    ServerIP: "192.0.2.40",
                    Records: { a: ["192.0.2.40"] },
                    Error: ""
                },
                {
                    TestID: "5",
                    DomainName: "example.com",
                    QueryType: "ns",
                    Protocol: "dot",
                    ServerIP: "[192.0.2.50]",
                    Records: { ns: ["ns2.example.com"] },
                    Error: ""
                }
            ];
        }
    });

    const result = await getData();

    const probe4 = result.TopBlock.Parameters.find(p => p.ProbeSource.ID === "4");
    assertEqual(probe4.ProbeName.endsWith("-tcp"), true, "ProbeName for TestID 4 should end with -tcp");

    const probe5 = result.TopBlock.Parameters.find(p => p.ProbeSource.ID === "5");
    assertEqual(probe5.ProbeName.endsWith("-dot"), true, "ProbeName for TestID 5 should end with -dot");
}

async function testServerIpSanitization() {
    global.fetch = async () => ({
        async json() {
            return [
                {
                    TestID: "6",
                    DomainName: "example.com",
                    QueryType: "ns",
                    Protocol: "udp",
                    ServerIP: "[192.0.2.60]",
                    Records: { ns: ["ns3.example.com"] },
                    Error: ""
                }
            ];
        }
    });

    const result = await getData();
    const mainSection = result.MainBlock.Sections[0];
    const param = mainSection.Parameters.find(p => p.GeneralName === "ns3.example.com");
    assertEqual(param.IP, "192.0.2.60", "ServerIP should be sanitized to remove brackets");
}

async function testUniqueDomains() {
    global.fetch = async () => ({
        async json() {
            return [
                {
                    TestID: "7",
                    DomainName: "example.com",
                    QueryType: "a",
                    Protocol: "udp",
                    ServerIP: "192.0.2.70",
                    Records: { a: ["192.0.2.70"] },
                    Error: ""
                },
                {
                    TestID: "8",
                    DomainName: "example.com",
                    QueryType: "ns",
                    Protocol: "udp",
                    ServerIP: "192.0.2.80",
                    Records: { ns: ["ns4.example.com"] },
                    Error: ""
                }
            ];
        }
    });

    const result = await getData();
    assertEqual(result.MainBlock.Sections.length, 1, "Should only have 1 domain section for duplicate domains");
}

async function testProbeAggregation() {
    global.fetch = async () => ({
        async json() {
            return [
                {
                    TestID: "9",
                    DomainName: "example.com",
                    QueryType: "a",
                    Protocol: "udp",
                    ServerIP: "192.0.2.180",
                    Records: { a: ["192.0.2.90"] },
                    Error: ""
                },
                {
                    TestID: "10",
                    DomainName: "example.com",
                    QueryType: "a",
                    Protocol: "udp",
                    ServerIP: "192.0.2.180",
                    Records: { a: ["192.0.2.91"] },
                    Error: ""
                }
            ];
        }
    });

    const result = await getData();
    const section = result.MainBlock.Sections[0];

    const paramsForIp = section.Parameters.filter(p => p.IP === "192.0.2.180");
    assertEqual(paramsForIp.length, 1, "Should aggregate probes with same ServerIP into one Parameters object");

    const probes = makeJSONUnique(paramsForIp[0].Probes);

    assertEqual(probes.length, 2, "Should have two probes under the same Parameters IP");
}

runMockedTests();
testSuccessFlag();
testProbeNameProtocolSuffix();
testServerIpSanitization();
testUniqueDomains();
testProbeAggregation();