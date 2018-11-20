var pages = {}

var loading = `
<div class="preloader-wrapper big active">
	<div class="spinner-layer spinner-blue-only">
		<div class="circle-clipper left">
			<div class="circle"></div>
		</div>
		<div class="gap-patch">
			<div class="circle"></div>
		</div>
		<div class="circle-clipper right">
			<div class="circle"></div>
		</div>
	</div>
</div>
`

pages.navigate = function(html) {

	var cont = document.getElementById('main-container')
	
	// If the page is a promise, it is loaging.
	// Make the main page a loagin animation,
	// and then show it
	if (html instanceof Promise) {
		cont.innerHTML = loading
		html.then(res => this.navigate(res))
		return
	}

	cont.innerHTML = html


	// Eval scripts on the page, since setting the innerHTML does not run them
	// This causes every script to be run AFTER it has been inserted, confusing some
	var scripts = cont.getElementsByTagName('script')
	for (i in scripts) {
		eval(scripts[i].text)
	}
}
