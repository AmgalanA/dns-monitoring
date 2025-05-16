const areas = [
    {
        "name": "M9-1 servers",
        "servers": [{
            "ip": "10.101.99.77",
            "role": "Primary",
            "name": "Prim. NS",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "10.101.13.55",
            "role": "Secondary",
            "name": "NS-55",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "10.101.13.99",
            "role": "Secondary",
            "name": "NS-99",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        }],
    },

    {
        "name": "hosting NS", 
        "servers": [{
            "ip": "11.101.99.77",
            "role": "Primary",
            "name": "Prim. NS",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "11.101.13.55",
            "role": "Secondary",
            "name": "NS-55",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "11.101.13.99",
            "role": "Secondary",
            "name": "NS-99",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },  
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        }],
    },
    {
        "name": "DS-backup", 
        "servers": [{
            "ip": "10.101.99.77",
            "role": "Primary",
            "name": "Prim. NS",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "10.101.13.55",
            "role": "Secondary",
            "name": "NS-55",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "10.101.13.99",
            "role": "Secondary",
            "name": "NS-99",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        }],
    },
    {
        "name": "KIAE-1", 
        "servers": [{
            "ip": "10.101.99.77",
            "role": "Primary",
            "name": "Prim. NS",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "10.101.13.55",
            "role": "Secondary",
            "name": "NS-55",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "10.101.13.99",
            "role": "Secondary",
            "name": "NS-99",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        }],
    },
    {
        "name": "VDS-sec",
        "servers": [{
            "ip": "10.101.99.77",
            "role": "Primary",
            "name": "Prim. NS",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "10.101.13.55",
            "role": "Secondary",
            "name": "NS-55",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        },
        {
            "ip": "10.101.13.99",
            "role": "Secondary",
            "name": "NS-99",
            "records": [
                {
                    "domain": null,
                    "type": "UDP"
                },
                {
                    "domain": null,
                    "type": "TCP"
                },
                {
                    "domain": null,
                    "type": "UDP/RTT"
                },
                {
                    "domain": "test.ru",
                    "type": "SOA"
                },
                {
                    "domain": "test.ru",
                    "type": "NS"
                },
                {
                    "domain": "test.ru",
                    "type": "A"
                },
                {
                    "domain": "example.com",
                    "type": "SOA"
                },
                {
                    "domain": "example.net",
                    "type": "SOA"
                }
            ]
        }],
    },
]

export { areas }