var templates = {}

templates.parse = function(tplName, args) {

	return fetch(`/templates/${tplName}`)
	.then(res => res.text())
	.then(tpl => {
		for (__i in args) {
			eval(`var ${__i} = args[__i]`)
		}

		// Return a async function, so await can be used within the templates
		return eval('(async function(){return `' + tpl + '`})()')
	})
}
