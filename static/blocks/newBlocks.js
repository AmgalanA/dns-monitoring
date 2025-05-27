const newBlocks = {
    "TopBlock": {
        "Parameters": [
            {
                "GeneralName": "NS-1",
                "ProbeName": "UDP",
                "ProbeSource": {
                    "Name": "NS udp",
                    "ID": "10-192831-13"
                },
                "ip": "10.10.11.13",
                "success": true
            },
            {
                "GeneralName": "NS-4/TEST.RU",
                "ProbeName": "A",
                "ProbeSource": {
                    "Name": "NS A",
                    "ID": "10-127825-17"
                },
                "ip": "10.10.3.193",
                "success": false
            },
            {
                "GeneralName": "NS-31",
                "ProbeName": "UDP",
                "ProbeSource": {
                    "Name": "NS udp",
                    "ID": "11-192832-14"
                },
                "ip": "10.10.1.113",
                "success": true
            },
            {
                "GeneralName": "NS-31/ITEST.RU",
                "ProbeName": "SOA",
                "ProbeSource": {
                    "Name": "NS soa",
                    "ID": "12-192833-15"
                },
                "ip": "10.10.11.13",
                "success": false
            },
            {
                "GeneralName": "NS-21",
                "ProbeName": "DoT",
                "ProbeSource": {
                    "Name": "NS dot",
                    "ID": "13-192834-16"
                },
                "ip": "10.10.2.113",
                "success": true
            },
            {
                "GeneralName": "NS-131",
                "ProbeName": "UDP",
                "ProbeSource": {
                    "Name": "NS udp",
                    "ID": "14-192835-17"
                },
                "ip": "10.11.1.3",
                "success": false
            },
            {
                "GeneralName": "NS-1",
                "ProbeName": "TCP",
                "ProbeSource": {
                    "Name": "NS tcp",
                    "ID": "15-192836-18"
                },
                "ip": "10.10.11.13",
                "success": true
            },
            {
                "GeneralName": "NS-31/EXAMPLE.COM",
                "ProbeName": "SOA",
                "ProbeSource": {
                    "Name": "NS soa",
                    "ID": "16-192837-19"
                },
                "ip": "10.10.1.113",
                "success": true
            },
            {
                "GeneralName": "NS-21",
                "ProbeName": "UDP",
                "ProbeSource": {
                    "Name": "NS udp",
                    "ID": "17-192838-20"
                },
                "ip": "10.10.2.113",
                "success": false
            },
            {
                "GeneralName": "NS-7",
                "ProbeName": "S/N",
                "ProbeSource": {
                    "Name": "NS sn",
                    "ID": "18-192839-21"
                },
                "ip": "10.10.7.3",
                "success": true
            },
            {
                "GeneralName": "NS-1/TEST.RU",
                "ProbeName": "A",
                "ProbeSource": {
                    "Name": "NS a",
                    "ID": "19-192840-22"
                },
                "ip": "10.10.11.13",
                "success": true
            },
            {
                "GeneralName": "NS-1",
                "ProbeName": "SOA",
                "ProbeSource": {
                    "Name": "NS soa",
                    "ID": "20-192841-23"
                },
                "ip": "10.10.11.13",
                "success": true
            },
            {
                "GeneralName": "NS-14",
                "ProbeName": "S/N",
                "ProbeSource": {
                    "Name": "NS sn",
                    "ID": "21-192842-24"
                },
                "ip": "10.10.7.193",
                "success": false
            },
            {
                "GeneralName": "NS-7",
                "ProbeName": "S/N",
                "ProbeSource": {
                    "Name": "NS sn",
                    "ID": "22-192843-25"
                },
                "ip": "10.10.7.3",
                "success": true
            },
            {
                "GeneralName": "NS-77",
                "ProbeName": "TCP",
                "ProbeSource": {
                    "Name": "NS tcp",
                    "ID": "22-192843-26"
                },
                "ip": "10.10.7.31",
                "success": true
            },
            {
                "GeneralName": "NS-12",
                "ProbeName": "AAAA",
                "ProbeSource": {
                    "Name": "NS aaaa",
                    "ID": "22-192843-27"
                },
                "ip": "10.10.3.2",
                "success": true
            }
        ]
    },
    "MainBlock": {
        "Sections": [
            {
                "GeneralName": "M9-1 servers",
                "Parameters": [
                    {
                        "GeneralName": "Prim. NS",
                        "IP": "10.101.99.77",
                        "Role": "Primary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13",
                                    "interval": "1"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19",
                                    "interval": "5"
                                }
                            },
                            {
                                "Name": "UDP/RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14",
                                    "interval": "60"
                                }
                            }
                        ]
                    },
                    {
                        "GeneralName": "NS-55",
                        "IP": "10.101.13.55",
                        "Role": "Secondary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-19",
                                    "interval": "60"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-21",
                                    "interval": "10"
                                }
                            },
                            {
                                "Name": "UDP/RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-33",
                                    "interval": "20"
                                }
                            }
                        ]
                    },
                    {
                        "GeneralName": "NS-99",
                        "IP": "10.101.13.99",
                        "Role": "Secondary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-45",
                                    "interval": "1"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-10",
                                    "interval": "1"
                                }
                            },
                            {
                                "Name": "UDP/RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-30",
                                    "interval": "60"
                                }
                            }
                        ]
                    }
                ]
            },
            
        ]
    }
}



export { newBlocks } 