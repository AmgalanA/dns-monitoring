const secondBlocks = {
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
                        "IP": "10.101.10.73",
                        "Role": "Primary",
                        "Probes": [
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    },
                    {
                        "GeneralName": "NS-55",
                        "IP": "10.101.5.1",
                        "Role": "Secondary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            },
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
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            },
                        ]
                    }
                ]
            },
            {
                "GeneralName": "hosting NS",
                "Parameters": [
                    {
                        "GeneralName": "Prim. NS",
                        "IP": "11.101.99.77",
                        "Role": "Primary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    },
                    {
                        "GeneralName": "NS-55",
                        "IP": "11.101.13.55",
                        "Role": "Secondary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    },
                    {
                        "GeneralName": "NS-99",
                        "IP": "11.101.13.99",
                        "Role": "Secondary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "GeneralName": "DS-backup",
                "Parameters": [
                    {
                        "GeneralName": "Prim. NS",
                        "IP": "10.132.94.77",
                        "Role": "Primary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    },
                    {
                        "GeneralName": "NS-55",
                        "IP": "10.111.13.55",
                        "Role": "Secondary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    },
                    {
                        "GeneralName": "NS-99",
                        "IP": "10.101.13.199",
                        "Role": "Secondary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "GeneralName": "KIAE-1",
                "Parameters": [
                    {
                        "GeneralName": "Prim. NS",
                        "IP": "10.131.99.177",
                        "Role": "Primary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    },
                    {
                        "GeneralName": "NS-55",
                        "IP": "1.1.1.55",
                        "Role": "Secondary",
                        "Probes": [
                            {
                                "Name": "UDP",
                                "ProbeSource": {
                                    "Name": "NS udp",
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
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
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "GeneralName": "VDS-sec",
                "IP": ["10.101.99.77", "10.101.13.55", "10.101.13.99"],
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
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
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
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
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
                                    "ID": "11-887144-13"
                                }
                            },
                            {
                                "Name": "TCP",
                                "ProbeSource": {
                                    "Name": "NS tcp",
                                    "ID": "17-813412-19"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            },
                            {
                                "Name": "RTT",
                                "ProbeSource": {
                                    "Name": "NS udp/rtt",
                                    "ID": "11-887144-14"
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    }
}



export { secondBlocks }