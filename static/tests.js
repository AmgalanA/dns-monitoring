const newTests = [
    {
        "generalName": "NS-1",
        "ProbeName": "UDP",
        "ProbeSource": {
            "Name": "NS udp",
            "Sucess": "true",
            "ID": "10-10-11-13"
        }
    },
    {
        "generalName": "NS-31",
        "ProbeName": "UDP",
        "ProbeSource": {
            "Name": "NS udp",
            "Sucess": "true",
            "ID": "10-10-1-113"
        }
    },
    {
        "generalName": "NS-31",
        "ProbeName": "SOA",
        "ProbeSource": {
            "Name": "NS soa",
            "Sucess": "false",
            "ID": "10-10-11-13"
        }
    },
    {
        "generalName": "NS-21",
        "ProbeName": "DoT",
        "ProbeSource": {
            "Name": "NS dot",
            "Sucess": "true",
            "ID": "10-10-2-113"
        }
    },
    {
        "generalName": "NS-131",
        "ProbeName": "UDP",
        "ProbeSource": {
            "Name": "NS udp",
            "Sucess": "false",
            "ID": "10-11-1-3"
        }
    },
    {
        "generalName": "NS-1",
        "ProbeName": "TCP",
        "ProbeSource": {
            "Name": "NS tcp",
            "Sucess": "true",
            "ID": "10-10-11-13"
        }
    },
    {
        "generalName": "NS-31",
        "ProbeName": "SOA",
        "ProbeSource": {
            "Name": "NS soa",
            "Sucess": "true",
            "ID": "10-10-1-113"
        }
    },
    {
        "generalName": "NS-21",
        "ProbeName": "UDP",
        "ProbeSource": {
            "Name": "NS udp",
            "Sucess": "false",
            "ID": "10-10-2-113"
        }
    },
    {
        "generalName": "NS-7",
        "ProbeName": "S/N",
        "ProbeSource": {
            "Name": "NS s/n",
            "Sucess": "true",
            "ID": "10-10-7-3"
        }
    },
    {
        "generalName": "NS-1",
        "ProbeName": "A",
        "ProbeSource": {
            "Name": "NS a",
            "Sucess": "true",
            "ID": "10-10-11-13"
        }
    },
    {
        "generalName": "NS-4",
        "ProbeName": "A",
        "ProbeSource": {
            "Name": "NS a",
            "Sucess": "false",
            "ID": "10-10-3-193"
        }
    },
    {
        "generalName": "NS-1",
        "ProbeName": "SOA",
        "ProbeSource": {
            "Name": "NS soa",
            "Sucess": "true",
            "ID": "10-10-11-13"
        }
    },
    {
        "generalName": "NS-14",
        "ProbeName": "S/N",
        "ProbeSource": {
            "Name": "NS s/n",
            "Sucess": "false",
            "ID": "10-10-7-193"
        }
    },
    {
        "generalName": "NS-7",
        "ProbeName": "S/N",
        "ProbeSource": {
            "Name": "NS s/n",
            "Sucess": "true",
            "ID": "10-10-7-3"
        }
    },
    {
        "generalName": "DNS-01",
        "ProbeName": "UDP",
        "ProbeSource": {
            "Name": "NS udp",
            "Sucess": "false",
            "ID": "192-168-1-10"
        }
    },
    {
        "generalName": "DNS-32",
        "ProbeName": "UDP",
        "ProbeSource": {
            "Name": "NS udp",
            "Sucess": "true",
            "ID": "192-168-2-20"
        }
    },
    {
        "generalName": "DNS-32",
        "ProbeName": "SOA",
        "ProbeSource": {
            "Name": "NS soa",
            "Sucess": "true",
            "ID": "192-168-1-10"
        }
    },
    {
        "generalName": "DNS-22",
        "ProbeName": "DoT",
        "ProbeSource": {
            "Name": "NS dot",
            "Sucess": "false",
            "ID": "192-168-3-30"
        }
    },
    {
        "generalName": "DNS-132",
        "ProbeName": "UDP",
        "ProbeSource": {
            "Name": "NS udp",
            "Sucess": "true",
            "ID": "192-168-4-40"
        }
    },
    {
        "generalName": "DNS-01",
        "ProbeName": "TCP",
        "ProbeSource": {
            "Name": "NS tcp",
            "Sucess": "true",
            "ID": "192-168-1-10"
        }
    }
]


const tests = [
    {
        "name": "NS-1",
        "ip": "10.10.11.13",
        "type": "UDP",
        "domain": null,
        "success": true
    },
    {
        "name": "NS-31",
        "ip": "10.10.1.113",
        "type": "UDP",
        "domain": null,
        "success": true
    },
    {
        "name": "NS-31",
        "ip": "10.10.11.13",
        "type": "SOA",
        "domain": "ITEST.RU",
        "success": false
    },
    {
        "name": "NS-21",
        "ip": "10.10.2.113",
        "type": "DoT",
        "domain": null,
        "success": true
    },
    {
        "name": "NS-131",
        "ip": "10.11.1.3",
        "type": "UDP",
        "domain": null,
        "success": false
    },
    {
        "name": "NS-1",
        "ip": "10.10.11.13",
        "type": "TCP",
        "domain": null,
        "success": true
    },
    {
        "name": "NS-31",
        "ip": "10.10.1.113",
        "type": "SOA",
        "domain": "EXAMPLE.COM",
        "success": true
    },
    {
        "name": "NS-21",
        "ip": "10.10.2.113",
        "type": "UDP",
        "domain": null,
        "success": false
    },
    {
        "name": "NS-7",
        "ip": "10.10.7.3",
        "type": "S/N",
        "domain": null,
        "success": true
    },
    {
        "name": "NS-1",
        "ip": "10.10.11.13",
        "type": "A",
        "domain": "TEST.RU",
        "success": true
    },
    {
        "name": "NS-4",
        "ip": "10.10.3.193",
        "type": "A",
        "domain": "TEST.RU",
        "success": false
    },
    {
        "name": "NS-1",
        "ip": "10.10.11.13",
        "type": "SOA",
        "domain": null,
        "success": true
    },
    {
        "name": "NS-14",
        "ip": "10.10.7.193",
        "type": "S/N",
        "domain": null,
        "success": false
    },
    {
        "name": "NS-7",
        "ip": "10.10.7.3",
        "type": "S/N",
        "domain": null,
        "success": true
    }
]

const mockTests = [
    {
        "name": "DNS-01",
        "ip": "192.168.1.10",
        "type": "UDP",
        "domain": null,
        "success": false
    },
    {
        "name": "DNS-32",
        "ip": "192.168.2.20",
        "type": "UDP",
        "domain": null,
        "success": true
    },
    {
        "name": "DNS-32",
        "ip": "192.168.1.10",
        "type": "SOA",
        "domain": "DOMAIN1.NET",
        "success": true
    },
    {
        "name": "DNS-22",
        "ip": "192.168.3.30",
        "type": "DoT",
        "domain": null,
        "success": false
    },
    {
        "name": "DNS-132",
        "ip": "192.168.4.40",
        "type": "UDP",
        "domain": null,
        "success": true
    },
    {
        "name": "DNS-01",
        "ip": "192.168.1.10",
        "type": "TCP",
        "domain": null,
        "success": true
    },
]

export { tests }