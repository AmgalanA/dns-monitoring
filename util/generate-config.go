package main

import (
	"encoding/json"
	"fmt"
	"net"
	"os"
	"strings"
	"time"

	"github.com/miekg/dns"
)

// --------------------------------------------------------------------------------------------------------------------------------
// Backend Config
// --------------------------------------------------------------------------------------------------------------------------------

type BackConfig struct {
	Tests []Test `json:"tests"`
}

type Test struct {
	TestID   string    `json:"test_id"`
	ZoneName string    `json:"zone_name"`
	ServerIP string    `json:"server_ip"`
	Interval string    `json:"interval"`
	TestType string    `json:"test_type"`
	SOATest  *SOATest  `json:"soa_test,omitempty"`
	NSTest   *NSTest   `json:"ns_test,omitempty"`
	ATest    *ATest    `json:"a_test,omitempty"`
	AAAATest *AAAATest `json:"aaaa_test,omitempty"`
	MXTest   *MXTest   `json:"mx_test,omitempty"`
}

type SOATest struct {
	ExpectedSOA ExpectedSOA `json:"expected_soa"`
}

type ExpectedSOA struct {
	PrimaryNS        string `json:"primary_ns"`
	ResponsibleEmail string `json:"responsible_email"`
	Serial           string `json:"serial"`
	Refresh          string `json:"refresh"`
	Retry            string `json:"retry"`
	Expire           string `json:"expire"`
	Minimum          string `json:"minimum"`
}

type NSTest struct {
	ExpectedNS string `json:"expected_ns"`
}

type ATest struct {
	ExpectedA []string `json:"expected_a"`
}

type AAAATest struct {
	ExpectedAAAA []string `json:"expected_aaaa"`
}

type MXTest struct {
	ExpectedMX []string `json:"expected_mx"`
}

type NameServerInfo struct {
	Hostname string
	IPv6     []string
	IPv4     []string
}

// --------------------------------------------------------------------------------------------------------------------------------
// Frontend Config
// --------------------------------------------------------------------------------------------------------------------------------

type FrontConfig struct {
	TopBlock  Block     `json:"TopBlock"`
	MainBlock MainBlock `json:"MainBlock"`
}

type Block struct {
	Parameters []Parameter `json:"Parameters"`
}

type MainBlock struct {
	Sections []Section `json:"Sections"`
}

type Section struct {
	GeneralName string   `json:"GeneralName"`
	Parameters  []Server `json:"Parameters"`
}

type Server struct {
	GeneralName string  `json:"GeneralName"`
	IP          string  `json:"IP"`
	Role        string  `json:"Role"`
	Probes      []Probe `json:"Probes"`
}

type Parameter struct {
	GeneralName string      `json:"GeneralName"`
	ProbeName   string      `json:"ProbeName"`
	ProbeSource ProbeSource `json:"ProbeSource"`
	IP          string      `json:"ip"`
	Success     string      `json:"success"`
}

type Probe struct {
	Name        string      `json:"Name"`
	ProbeSource ProbeSource `json:"ProbeSource"`
}

type ProbeSource struct {
	Name string `json:"Name"`
	ID   string `json:"ID"`
}

func getAuthServers(zone string, resolver string) ([]NameServerInfo, error) {
	c := new(dns.Client)
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(zone), dns.TypeNS)

	r, _, err := c.Exchange(m, resolver)
	if err != nil {
		return nil, fmt.Errorf("DNS query failed: %v", err)
	}

	var nsServers []NameServerInfo
	for _, ans := range append(r.Answer, r.Ns...) {
		if ns, ok := ans.(*dns.NS); ok {
			nsServer := NameServerInfo{}

			nsServer.Hostname = ns.Ns

			ipv4, err := getIPv4ForNS(ns.Ns, resolver)

			if err != nil {
				fmt.Printf("Error getting IPv4 for %s: %v\n", ns, err)
				continue
			}

			if len(ipv4) == 0 {
				fmt.Println("  No IPv4 addresses found")
				continue
			}

			nsServer.IPv4 = ipv4

			ipv6, err := getIPv6ForNS(ns.Ns, resolver)

			if err != nil {
				fmt.Printf("Error getting IPv6 for %s: %v\n", ns, err)
				continue
			}

			if len(ipv6) == 0 {
				fmt.Println("  No IPv6 addresses found")
				continue
			}

			nsServer.IPv6 = ipv6

			nsServers = append(nsServers, nsServer)
		}
	}

	if len(nsServers) == 0 {
		return nil, fmt.Errorf("no ns records found")
	}

	return nsServers, nil

}

func getIPv4ForNS(nsServer, resolver string) ([]string, error) {
	c := new(dns.Client)
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(nsServer), dns.TypeA)

	r, _, err := c.Exchange(m, resolver)
	if err != nil {
		return nil, fmt.Errorf("a query failed: %v", err)
	}

	var ipv4Addrs []string
	for _, ans := range r.Answer {
		if a, ok := ans.(*dns.A); ok {
			ipv4Addrs = append(ipv4Addrs, a.A.String())
		}
	}

	return ipv4Addrs, nil
}

func getIPv6ForNS(nsServer, resolver string) ([]string, error) {
	c := new(dns.Client)
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(nsServer), dns.TypeAAAA)

	r, _, err := c.Exchange(m, resolver)
	if err != nil {
		return nil, fmt.Errorf("AAAA query failed: %v", err)
	}

	var ipv6Addrs []string
	for _, ans := range r.Answer {
		if aaaa, ok := ans.(*dns.AAAA); ok {
			ipv6Addrs = append(ipv6Addrs, aaaa.AAAA.String())
		}
	}

	return ipv6Addrs, nil
}

func queryDNS(zone string, rrType uint16, resolver string, protocol string) (string, error) {
	client := new(dns.Client)
	client.Net = protocol
	client.Timeout = 5 * time.Second

	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(zone), rrType)

	r, _, err := client.Exchange(m, resolver)
	if err != nil {
		return "", err
	}

	if len(r.Answer) == 0 {
		return "", fmt.Errorf("нет записей типа %s", dns.TypeToString[rrType])
	}

	var result string
	for _, ans := range r.Answer {
		result += fmt.Sprintf("%s\n", ans)
	}

	return result, nil
}

func checkProtocolAccess(zone, resolver string) string {
	protocol := "udp"
	fmt.Printf("\nПроверка доступности %s:\n", zone)

	// Проверка UDP
	start := time.Now()
	_, err := queryDNS(zone, dns.TypeA, resolver, "udp")
	udpTime := time.Since(start)

	if err != nil {
		fmt.Printf("UDP: недоступен (%v)\n", err)
	} else {
		fmt.Printf("UDP: доступен, время ответа: %v\n", udpTime)
	}

	// Проверка TCP
	start = time.Now()
	_, err = queryDNS(zone, dns.TypeA, resolver, "tcp")
	tcpTime := time.Since(start)

	if err != nil {
		fmt.Printf("TCP: недоступен (%v)\n", err)
	} else {
		fmt.Printf("TCP: доступен, время ответа: %v\n", tcpTime)
		protocol = "tcp"
	}

	return protocol
}

func writeJSONWithBuffer(filename string, data interface{}) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	return encoder.Encode(data)
}

func getSOARecord(domain, resolver string) (*dns.SOA, error) {
	c := new(dns.Client)
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(domain), dns.TypeSOA)

	r, _, err := c.Exchange(m, resolver)
	if err != nil {
		return nil, err
	}

	for _, ans := range r.Answer {
		if soa, ok := ans.(*dns.SOA); ok {
			return soa, nil
		}
	}

	return nil, fmt.Errorf("SOA запись не найдена")
}

func getNSRecords(domain, resolver string) ([]string, error) {
	c := new(dns.Client)
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(domain), dns.TypeNS)

	r, _, err := c.Exchange(m, resolver)
	if err != nil {
		return nil, err
	}

	var ns []string
	for _, ans := range r.Answer {
		if nsRec, ok := ans.(*dns.NS); ok {
			ns = append(ns, nsRec.Ns)
		}
	}

	if len(ns) == 0 {
		return nil, fmt.Errorf("NS записи не найдены")
	}

	return ns, nil
}

func getARecords(domain, resolver string) ([]string, error) {
	c := new(dns.Client)
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(domain), dns.TypeA)

	r, _, err := c.Exchange(m, resolver)
	if err != nil {
		return nil, err
	}

	var a []string
	for _, ans := range r.Answer {
		if aRec, ok := ans.(*dns.A); ok {
			a = append(a, aRec.A.String())
		}
	}

	if len(a) == 0 {
		return nil, fmt.Errorf("a записи не найдены")
	}

	return a, nil
}

func getAAAARecords(domain, resolver string) ([]string, error) {
	c := new(dns.Client)
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(domain), dns.TypeAAAA)

	r, _, err := c.Exchange(m, resolver)
	if err != nil {
		return nil, err
	}

	var aaaa []string
	for _, ans := range r.Answer {
		if aaaaRec, ok := ans.(*dns.AAAA); ok {
			aaaa = append(aaaa, aaaaRec.AAAA.String())
		}
	}

	if len(aaaa) == 0 {
		return nil, fmt.Errorf("AAAA записи не найдены")
	}

	return aaaa, nil
}

func getMXRecords(domain, resolver string) ([]string, error) {
	c := new(dns.Client)
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(domain), dns.TypeMX)

	r, _, err := c.Exchange(m, resolver)
	if err != nil {
		return nil, err
	}

	var mx []string
	for _, ans := range r.Answer {
		if mxRec, ok := ans.(*dns.MX); ok {
			mx = append(mx, mxRec.Mx)
		}
	}

	if len(mx) == 0 {
		return nil, fmt.Errorf("MX записи не найдены")
	}

	return mx, nil
}

func checkServerRole(zone, serverToCheck, resolver string) (string, error) {
	soa1, err := getSOARecordFromNameserver(zone, serverToCheck)
	if err != nil {
		return "", fmt.Errorf("failed to get SOA from target server: %v", err)
	}

	soa2, err := getSOARecordFromNameserver(zone, resolver)
	if err != nil {
		return "", fmt.Errorf("failed to get SOA from resolver: %v", err)
	}

	if soa1.Serial == soa2.Serial {
		return "PRIMARY", nil
	} else if soa1.Serial < soa2.Serial {
		return "SECONDARY", nil
	}

	return "UNKNOWN", nil
}

func getSOARecordFromNameserver(zone, nameserver string) (*dns.SOA, error) {
	c := new(dns.Client)
	c.Net = "tcp"
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(zone), dns.TypeSOA)
	m.RecursionDesired = false

	r, _, err := c.Exchange(m, net.JoinHostPort(nameserver, "53"))
	if err != nil {
		return nil, err
	}

	for _, ans := range append(r.Answer, r.Ns...) {
		if soa, ok := ans.(*dns.SOA); ok {
			return soa, nil
		}
	}

	return nil, fmt.Errorf("SOA record not found")
}

func getNSRecordsFromNameserver(zone, nameserver string) ([]string, time.Duration, error) {
	client := new(dns.Client)
	client.Net = "udp"
	client.Timeout = 2 * time.Second

	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(zone), dns.TypeNS)
	m.RecursionDesired = false

	response, rtt, err := client.Exchange(m, net.JoinHostPort(nameserver, "53"))
	if err != nil {
		return nil, 0, fmt.Errorf("DNS query failed: %v", err)
	}

	if response.Rcode != dns.RcodeSuccess {
		return nil, 0, fmt.Errorf("DNS query returned error: %s", dns.RcodeToString[response.Rcode])
	}

	var nsRecords []string
	for _, rr := range append(response.Answer, response.Ns...) {
		if ns, ok := rr.(*dns.NS); ok {
			nsRecords = append(nsRecords, ns.Ns)
		}
	}

	if len(nsRecords) == 0 {
		return nil, 0, fmt.Errorf("no NS records found in response")
	}

	return nsRecords, rtt, nil
}

func getARecordsFromNameserver(domain, nameserver string) ([]string, error) {
	c := new(dns.Client)
	c.Net = "tcp"
	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(domain), dns.TypeA)
	m.RecursionDesired = false
	m.SetEdns0(4096, true)

	nsWithPort := nameserver
	if _, _, err := net.SplitHostPort(nameserver); err != nil {
		nsWithPort = net.JoinHostPort(nameserver, "53")
	}

	r, _, err := c.Exchange(m, nsWithPort)
	if err != nil {
		return nil, fmt.Errorf("query to nameserver failed: %v", err)
	}

	if r.Rcode == dns.RcodeNameError {
		return nil, fmt.Errorf("domain %s does not exist on this nameserver", domain)
	}

	if !r.Authoritative {
		return nil, fmt.Errorf("nameserver %s is not authoritative for %s", nameserver, domain)
	}

	var a []string
	for _, ans := range r.Answer {
		if aRec, ok := ans.(*dns.A); ok {
			a = append(a, aRec.A.String())
		}
	}

	if len(a) == 0 {
		return nil, fmt.Errorf("A records not found in nameserver %s response", nameserver)
	}

	return a, nil
}

func getAAAARecordsFromNameserver(zone, nameserver string) ([]string, error) {
	c := new(dns.Client)
	c.Net = "tcp"

	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(zone), dns.TypeAAAA)
	m.RecursionDesired = false
	m.SetEdns0(4096, true)

	nsWithPort := nameserver
	if _, _, err := net.SplitHostPort(nameserver); err != nil {
		nsWithPort = net.JoinHostPort(nameserver, "53")
	}

	r, _, err := c.Exchange(m, nsWithPort)
	if err != nil {
		return nil, fmt.Errorf("query to nameserver failed: %v", err)
	}

	if r.Rcode == dns.RcodeNameError {
		return nil, fmt.Errorf("zone %s does not exist on this nameserver", zone)
	}

	if !r.Authoritative {
		return nil, fmt.Errorf("nameserver %s is not authoritative for %s", nameserver, zone)
	}

	var aaaa []string
	for _, ans := range r.Answer {
		if rec, ok := ans.(*dns.AAAA); ok {
			aaaa = append(aaaa, rec.AAAA.String())
		}
	}

	if len(aaaa) == 0 {
		return nil, fmt.Errorf("AAAA records not found in nameserver %s response", nameserver)
	}

	return aaaa, nil
}

func getMXRecordsFromNameserver(zone, nameserver string) ([]string, error) {
	if _, _, err := net.SplitHostPort(nameserver); err != nil {
		nameserver = net.JoinHostPort(nameserver, "53")
	}

	c := &dns.Client{
		Net: "udp",
	}

	m := new(dns.Msg)
	m.SetQuestion(dns.Fqdn(zone), dns.TypeMX)
	m.RecursionDesired = true

	r, _, err := c.Exchange(m, nameserver)
	if err != nil {
		return nil, fmt.Errorf("DNS query to %s failed: %v", nameserver, err)
	}

	if r.Rcode != dns.RcodeSuccess {
		return nil, fmt.Errorf("DNS error from %s: %s", nameserver, dns.RcodeToString[r.Rcode])
	}

	var mxRecords []string
	for _, ans := range r.Answer {
		if mx, ok := ans.(*dns.MX); ok {
			mxRecords = append(mxRecords, fmt.Sprintf("%d %s", mx.Preference, mx.Mx))
		}
	}

	if len(mxRecords) == 0 {
		return nil, fmt.Errorf("no MX records found in response from %s", nameserver)
	}

	return mxRecords, nil
}

func checkUDPConnectivity(zone, nameserver string) (bool, time.Duration, error) {
	client := &dns.Client{
		Net:          "udp",
		Timeout:      2 * time.Second,
		ReadTimeout:  2 * time.Second,
		WriteTimeout: 2 * time.Second,
	}

	msg := new(dns.Msg)
	msg.SetQuestion(dns.Fqdn(zone), dns.TypeSOA)

	_, rtt, err := client.Exchange(msg, net.JoinHostPort(nameserver, "53"))

	if err != nil {
		return false, 0, fmt.Errorf("UDP query failed: %v", err)
	}

	return true, rtt, nil
}

func checkTCPConnectivity(zone, nameserver string) (bool, time.Duration, error) {
	client := &dns.Client{
		Net:          "tcp",
		Timeout:      3 * time.Second, // TCP typically slower
		ReadTimeout:  3 * time.Second,
		WriteTimeout: 3 * time.Second,
	}

	msg := new(dns.Msg)
	msg.SetQuestion(dns.Fqdn(zone), dns.TypeSOA)

	_, rtt, err := client.Exchange(msg, net.JoinHostPort(nameserver, "53"))

	if err != nil {
		return false, 0, fmt.Errorf("TCP query failed: %v", err)
	}

	return true, rtt, nil
}

func main() {
	interval := ""
	zone := os.Args[1]
	probesConfig := os.Args[2]
	viewConfig := os.Args[3]

	if len(os.Args) == 4 {
		interval = "5"
	} else if len(os.Args) == 5 {
		interval = os.Args[4]
	}

	if zone == "" || probesConfig == "" || viewConfig == "" {
		fmt.Println("Все параметры должны быть указаны")
		os.Exit(1)
	}

	fmt.Printf("Генерация конфигурации для:\n")
	fmt.Printf("Зона: %s\n", zone)
	fmt.Printf("Файл probes: %s\n", probesConfig)
	fmt.Printf("Файл view: %s\n", viewConfig)
	fmt.Printf("Интервал: %s секунд\n", interval)

	resolver := "1.1.1.1:53"

	nsServers, err := getAuthServers(zone, resolver)
	if err != nil {
		fmt.Printf("Ошибка: %v\n", err)
		return
	}

	fmt.Printf("Авторитативные серверы для %s:\n", zone)
	for _, nsServer := range nsServers {
		fmt.Println(nsServer)
	}

	// ---------------------------------------------------------------------------------------------------------------------
	// Заполняем конфиг для бэкэнда
	// ---------------------------------------------------------------------------------------------------------------------
	config := BackConfig{}

	for _, nsServer := range nsServers {
		soa, err := getSOARecordFromNameserver(zone, nsServer.Hostname)

		if err != nil {
			fmt.Printf("SOA запрос ошибка: %v\n", err)
		} else {
			splittedSoa := strings.Split(strings.Split(soa.String(), "\t")[4], " ")

			config.Tests = append(config.Tests, Test{
				TestID:   fmt.Sprintf("%s-soa", zone),
				ZoneName: zone,
				ServerIP: nsServer.IPv4[0],
				Interval: interval,
				TestType: "soa",
				SOATest: &SOATest{
					ExpectedSOA: ExpectedSOA{
						PrimaryNS:        splittedSoa[0],
						ResponsibleEmail: splittedSoa[1],
						Serial:           splittedSoa[2],
						Refresh:          splittedSoa[3],
						Retry:            splittedSoa[4],
						Expire:           splittedSoa[5],
						Minimum:          splittedSoa[6],
					},
				},
			})
		}

		nsRecords, _, err := getNSRecordsFromNameserver(zone, nsServer.Hostname)
		if err == nil && len(nsRecords) > 0 {
			config.Tests = append(config.Tests, Test{
				TestID:   fmt.Sprintf("%s-ns", zone),
				ZoneName: zone,
				ServerIP: nsServers[0].IPv4[0],
				Interval: interval,
				TestType: "ns",
				NSTest: &NSTest{
					ExpectedNS: nsRecords[0],
				},
			})
		}

		// aRecords, err := getARecordsFromNameserver(zone, nsServer.Hostname)
		aRecords, err := getIPv4ForNS(nsServer.Hostname, resolver)
		fmt.Println("A: ", aRecords)
		if err == nil && len(aRecords) > 0 {
			config.Tests = append(config.Tests, Test{
				TestID:   fmt.Sprintf("%s-a", zone),
				ZoneName: zone,
				ServerIP: nsServers[0].IPv4[0],
				Interval: interval,
				TestType: "a",
				ATest: &ATest{
					ExpectedA: aRecords,
				},
			})
		}

		// aaaaRecords, err := getAAAARecordsFromNameserver(zone, nsServer.IPv6[0])
		aaaaRecords, err := getIPv6ForNS(nsServer.Hostname, resolver)
		fmt.Println("AAAA: ", aaaaRecords)
		if err == nil && len(aaaaRecords) > 0 {
			config.Tests = append(config.Tests, Test{
				TestID:   fmt.Sprintf("%s-aaaa", zone),
				ZoneName: zone,
				ServerIP: nsServers[0].IPv4[0],
				Interval: interval,
				TestType: "aaaa",
				AAAATest: &AAAATest{
					ExpectedAAAA: aaaaRecords,
				},
			})
		}

		mxRecords, err := getMXRecordsFromNameserver(zone, nsServer.Hostname)
		fmt.Println("MX: ", mxRecords)
		if err == nil && len(mxRecords) > 0 {
			config.Tests = append(config.Tests, Test{
				TestID:   fmt.Sprintf("%s-mx", zone),
				ZoneName: zone,
				ServerIP: nsServers[0].IPv4[0],
				Interval: interval,
				TestType: "mx",
				MXTest: &MXTest{
					ExpectedMX: mxRecords,
				},
			})
		}
	}

	writeJSONWithBuffer(probesConfig, config)

	// ---------------------------------------------------------------------------------------------------------------------
	// Заполняем конфиг для фронтенда
	// ---------------------------------------------------------------------------------------------------------------------

	frontConfig := FrontConfig{}

	block := Block{}

	for _, nsServer := range nsServers {
		soaParameter := Parameter{}

		soaParameter.GeneralName = nsServer.Hostname

		soaParameter.ProbeName = "SOA"

		_, soaErr := getSOARecordFromNameserver(zone, nsServer.Hostname)

		if soaErr != nil {
			soaParameter.Success = "false"
		} else {
			soaParameter.Success = "true"
		}

		soaParameter.ProbeSource.Name = "NS " + "soa"
		soaParameter.ProbeSource.ID = fmt.Sprintf("%s-soa", zone)

		soaParameter.IP = nsServer.IPv4[0]

		aParameter := Parameter{}

		aParameter.GeneralName = nsServer.Hostname

		aParameter.ProbeName = "A"

		_, aErr := getARecordsFromNameserver(zone, nsServer.Hostname)

		if aErr != nil {
			aParameter.Success = "false"
		} else {
			aParameter.Success = "true"
		}

		aParameter.ProbeSource.Name = "NS " + "a"
		aParameter.ProbeSource.ID = fmt.Sprintf("%s-a", zone)

		aParameter.IP = nsServer.IPv4[0]

		udpParameter := Parameter{}

		udpParameter.GeneralName = nsServer.Hostname

		udpParameter.ProbeName = "UDP"

		isUDPConnect, _, _ := checkUDPConnectivity(zone, nsServer.Hostname)

		if isUDPConnect {
			udpParameter.Success = "true"
		} else {
			udpParameter.Success = "false"
		}

		udpParameter.ProbeSource.Name = "NS " + "udp"
		udpParameter.ProbeSource.ID = fmt.Sprintf("%s-udp", zone)

		udpParameter.IP = nsServer.IPv4[0]

		tcpParameter := Parameter{}

		tcpParameter.ProbeName = "TCP"

		isTCPConnect, _, _ := checkTCPConnectivity(zone, nsServer.Hostname)

		if isTCPConnect {
			tcpParameter.Success = "true"
		} else {
			tcpParameter.Success = "false"
		}

		tcpParameter.ProbeSource.Name = "NS " + "tcp"
		tcpParameter.ProbeSource.ID = fmt.Sprintf("%s-tcp", zone)

		tcpParameter.IP = nsServer.IPv4[0]

		block.Parameters = append(block.Parameters, soaParameter)
		block.Parameters = append(block.Parameters, aParameter)
		block.Parameters = append(block.Parameters, udpParameter)
		block.Parameters = append(block.Parameters, tcpParameter)
	}

	frontConfig.TopBlock = block

	testSection := Section{}

	testSection.GeneralName = zone

	for _, nsServer := range nsServers {
		testServer := Server{}

		testServer.GeneralName = nsServer.Hostname

		testServer.IP = nsServer.IPv4[0]

		role, _ := checkServerRole(zone, nsServer.Hostname, resolver)

		testServer.Role = role

		udpProbe := Probe{}

		udpProbe.Name = "UDP"

		udpProbe.ProbeSource.Name = "NS udp"

		udpProbe.ProbeSource.ID = fmt.Sprintf("%s-udp", zone)

		testServer.Probes = append(testServer.Probes, udpProbe)

		tcpProbe := Probe{}

		tcpProbe.Name = "TCP"

		tcpProbe.ProbeSource.Name = "NS tcp"

		tcpProbe.ProbeSource.ID = fmt.Sprintf("%s-tcp", zone)

		testServer.Probes = append(testServer.Probes, tcpProbe)

		testSection.Parameters = append(testSection.Parameters, testServer)
	}

	frontConfig.MainBlock.Sections = append(frontConfig.MainBlock.Sections, testSection)

	writeJSONWithBuffer(viewConfig, frontConfig)
}
