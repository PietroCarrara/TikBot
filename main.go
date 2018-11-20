package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

func main() {
	address, _ := url.Parse("http://api2.musical.ly/")

	// Proxy allowing CORS requests
	proxy := httputil.NewSingleHostReverseProxy(address)

	proxy.Director = func(r *http.Request) {

		r.Header.Set("User-Agent", "com.zhiliaoapp.musically/2018110931")

		r.URL.Scheme = address.Scheme
		r.URL.Host = address.Host

		r.Host = address.Host

		fmt.Println(r)
	}

	proxy.ModifyResponse = func(r *http.Response) error {

		r.Header.Set("Access-Control-Allow-Origin", "*")
		return nil
	}

	go http.ListenAndServe(":8181", proxy)

	static := http.FileServer(http.Dir("./static/"))
	http.Handle("/", static)

	http.Handle("/Exit", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		os.Exit(0)
	}))

	http.ListenAndServe(":8080", nil)
}
