var router = {}

router.init = function() {

	var links = document.getElementsByTagName('a')

	for(var i in links) {

		var l = links[i].href

		if (typeof l == 'undefined') {
			continue
		}

		l = l.replace(window.location.href, '')

		links[i].href = 'javascript:router.goto("' + l + '")'
	}

}

router.goto = function (url) {
	
	if (url == '') {
		return
	}
	
	// Get route and args
	[url, ...args] = url.split('/')

	// Callback
	router[url](...args)
}
