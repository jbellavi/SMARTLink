(() => {
	// wrapper for initialization functions
	let init = {};

	/**
	 * Main initialization function.
	 */
	init.go = () => {
		init.load();
	};

	/**
	 * Fetches the data from the API and puts it on the page.
	 */
	init.load = () => {
		let url = window.location.href;

		// TODO: get the query and UID from somewhere
		let section = "marijuana";

		api.call.getArticles(section, init.success, init.failure)
	};

	/**
	 * Computes the url of the given article.
	 */
	init.getUrl = (article) => {
		return article.source === '' 
			   ? "/article.html#" + article.id
			   : article.url;
	}

	/**
	 * Finds the element with the given id on the page and assigns
	 * it a value.
	 *
	 * @param id     the id of the node
	 * @param value  the value the node should hold
	 */
	init.set = (id, value) => {
		let node = document.getElementById(id);

		if (node) {
			node.innerHTML = value;
		} else {
			console.log("ERROR: node with id " + id + " not found.")
		}
	};

	/**
	 * Called when the articles are found.
	 */
	init.success = (articles) => {
		let content = document.getElementById('main-content');

		for (let article of articles) {
			let byline = "by " + article.author;
			let via = "via " + article.source;
			let url = init.getUrl(article);

			let viaLine = article.source === '' ? '' : <div class="miniline">{via}</div>

			content.appendChild(
				<a class="article-wrap" href={url}>
					<div class="article">
						<div class="article-image"></div>
						<div class="article-content">
							<div class="article-header">
								<h2 class="article-title">{article.title}</h2>
								<div class="byline">{byline}</div>
							</div>
							<div class="miniline">{article.date}</div>
							<div class="summary">{article.summary}</div>
							<div class="miniline">{via}</div>
							{viaLine}
						</div>
					</div>
				</a>
			);
		}
	};

	/**
	 * Called when the section is not found.
	 */
	init.failure = () => {
		// TODO:
		let content = document.getElementById('main-content');

		content.appendChild(
			<div class="simple">
				<div class="text">
					We're having trouble finding this lesson. Please make sure that you have the correct url.
				</div>
			</div>
		);
	};

	// set everything in motion.
	init.go();
})();
