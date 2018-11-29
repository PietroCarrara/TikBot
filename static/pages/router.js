var router = {}

// The current "url"
router.current = ''

router.init = function() {

	// Transform links
	var links = document.getElementsByTagName('a')
	for(var i in links) {
		var l = links[i].href
		if (typeof l == 'undefined') {
			continue
		}
		links[i].href = router.link(l)
	}

	var url = window.location.hash.replace('#', '')

	if (url != router.current) {
		router.current = url
		router.goto(url)
	}

}

router.goto = function (uri) {
	
	if (uri == '') {
		return
	}

	router.current = uri;
	window.location.hash = uri;

	// Get route and args
	[url, ...args] = uri.split('/')

	// Callback
	router[url](...args)

}

router.link = function(url) {
	var l = url.replace(window.location.href, '')
	
	return 'javascript:router.goto("' + l + '")'
}
