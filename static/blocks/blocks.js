export const blocks = {
  "TopBlock": {
    "Parameters": [
      {
        "GeneralName": "a.iana-servers.net.",
        "ProbeName": "SOA",
        "ProbeSource": {
          "Name": "NS soa",
          "ID": "example.com-soa"
        },
        "ip": "199.43.135.53",
        "success": "true"
      },
      {
        "GeneralName": "a.iana-servers.net.",
        "ProbeName": "A",
        "ProbeSource": {
          "Name": "NS a",
          "ID": "example.com-a"
        },
        "ip": "199.43.135.53",
        "success": "true"
      },
      {
        "GeneralName": "a.iana-servers.net.",
        "ProbeName": "UDP",
        "ProbeSource": {
          "Name": "NS udp",
          "ID": "example.com-udp"
        },
        "ip": "199.43.135.53",
        "success": "true"
      },
      {
        "GeneralName": "",
        "ProbeName": "TCP",
        "ProbeSource": {
          "Name": "NS tcp",
          "ID": "example.com-tcp"
        },
        "ip": "199.43.135.53",
        "success": "true"
      },
      {
        "GeneralName": "b.iana-servers.net.",
        "ProbeName": "SOA",
        "ProbeSource": {
          "Name": "NS soa",
          "ID": "example.com-soa"
        },
        "ip": "199.43.133.53",
        "success": "true"
      },
      {
        "GeneralName": "b.iana-servers.net.",
        "ProbeName": "A",
        "ProbeSource": {
          "Name": "NS a",
          "ID": "example.com-a"
        },
        "ip": "199.43.133.53",
        "success": "true"
      },
      {
        "GeneralName": "b.iana-servers.net.",
        "ProbeName": "UDP",
        "ProbeSource": {
          "Name": "NS udp",
          "ID": "example.com-udp"
        },
        "ip": "199.43.133.53",
        "success": "true"
      },
      {
        "GeneralName": "",
        "ProbeName": "TCP",
        "ProbeSource": {
          "Name": "NS tcp",
          "ID": "example.com-tcp"
        },
        "ip": "199.43.133.53",
        "success": "true"
      }
    ]
  },
  "MainBlock": {
    "Sections": [
      {
        "GeneralName": "example.com",
        "Parameters": [
          {
            "GeneralName": "a.iana-servers.net.",
            "IP": "199.43.135.53",
            "Role": "",
            "Probes": [
              {
                "Name": "UDP",
                "ProbeSource": {
                  "Name": "NS udp",
                  "ID": "example.com-udp"
                }
              },
              {
                "Name": "TCP",
                "ProbeSource": {
                  "Name": "NS tcp",
                  "ID": "example.com-tcp"
                }
              }
            ]
          },
          {
            "GeneralName": "b.iana-servers.net.",
            "IP": "199.43.133.53",
            "Role": "",
            "Probes": [
              {
                "Name": "UDP",
                "ProbeSource": {
                  "Name": "NS udp",
                  "ID": "example.com-udp"
                }
              },
              {
                "Name": "TCP",
                "ProbeSource": {
                  "Name": "NS tcp",
                  "ID": "example.com-tcp"
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
