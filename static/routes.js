router.userFavs = function(userID) {

	tiktok.getUserFavs(userID)
	.then(async feed => {
		pages.navigate(templates.parse('aweme_list.html', {
			aweme_list: feed.aweme_list
		}))
	})
}
