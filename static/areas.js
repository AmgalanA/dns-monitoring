export const tests = [
    {
        "TestID": "example-com-ns",
        "Status": "Failed",
        "DomainName": "example.com",
        "QueryType": "ns",
        "ServerIP": "199.43.135.53",
        "Records": [
            "a.iana-servers.net.",
            "b.iana-servers.net."
        ],
        "ResponseTime": 118085063,
        "Error": "NS record did not match expected value"
    },
    {
        "TestID": "example-com-soa",
        "Status": "Failed",
        "DomainName": "example.com",
        "QueryType": "soa",
        "ServerIP": "199.43.135.53",
        "Records": [
            "ns.icann.org. noc.dns.icann.org. 2025011646 7200 3600 1209600 3600"
        ],
        "ResponseTime": 118474260,
        "Error": "SOA record did not match expected values"
    },
    {
        "TestID": "example-com-a",
        "Status": "Passed",
        "DomainName": "example.com",
        "QueryType": "a",
        "ServerIP": "199.43.135.53",
        "Records": [
            "23.192.228.80",
            "23.192.228.84",
            "23.215.0.136",
            "23.215.0.138",
            "96.7.128.175",
            "96.7.128.198"
        ],
        "ResponseTime": 117320741,
        "Error": ""
    }
]