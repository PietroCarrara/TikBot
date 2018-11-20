var templates = {}

templates.parse = function(tplName, args) {

	return fetch(`/templates/${tplName}`)
	.then(res => res.text())
	.then(tpl => {
		for (__i in args) {
			eval(`var ${__i} = args[__i]`)
			console.log(`var ${__i} = args[__i]`)
		}

		return eval('`' + tpl + '`')
	})

}
