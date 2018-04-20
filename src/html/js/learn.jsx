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
		let id = url.substring(url.indexOf('#') + 1);

		// TODO: get the uid from somewhere
		let uid = 0;

		api.call.getSections(init.success, init.failure);
		
	};

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
	 * Called when the job is found.
	 */
	init.success = (data) => {
		for (let section of data) {
			api.call.getArticles(section, (data) => {
				init.sectionSuccess(data, section);
			}, init.sectionFail);
		}
	};

	/**
	 * Encodes a name in a consistent way.
	 */
	init.encodeName = (raw) => {
		return raw.split('\W').join('').split('\s+').join('-').toLowerCase();
	}

	/**
	 * Called when a section loads sucdessfully.
	 *
	 * @param articles     the data returned from the API
	 * @param sectionName  the name of the section
	 */
	init.sectionSuccess = (articles, sectionName) => {
		let content = document.getElementById('content');

		let sectionBody = <div class="section-body"></div>;
		let sections = Math.min(articles.length, 4);

		let url = "/learn-topic.html#" + init.encodeName(sectionName);

		// make the primary
		// trip to 4 items
		// loop over articles
		// make the secondaries (up to 3)
		// throw it all together, with the title too.

		sectionBody.appendChild(init.largeArticle(articles[0]));

		for (let i = 1; i < sections; i++) {
			sectionBody.appendChild(init.smallArticle(articles[i]));
		}

		content.appendChild(
			<div class="section">
				<div class="section-header">
					<h2 class="header-text">{sectionName}</h2>
					<a href={url} class="header-link">See all&hellip;</a>
				</div>
				{sectionBody}
			</div>
		);
	};

	/**
	 * Initializes a large article.
	 *
	 * @param article  the article to render 
	 */
	init.largeArticle = (article) => {
		let byline = "by " + article.author;

		return (
			<div class="article-large">
				<div class="article-title">{article.title}</div>
				<div class="article-byline">{byline}</div>
			</div>
		);
	};

	/**
	 * Initializes a small article.
	 *
	 * @param article  the article to render 
	 */
	init.smallArticle = (article) => {
		let byline = "by " + article.author;

		return (
			<div class="article-small">
				<div class="article-small-image"></div>
				<div class="article-small-title">{article.title}</div>
				<div class="article-small-byline">{byline}</div>
			</div>
		);
	};

	/**
	 * Called when the job is not found.
	 */
	init.failure = () => {
		// TODO: 
	};

	/**
	 * Called when a section fails to load.
	 */
	init.sectionFailure = () => {

	};

	// set everything in motion.
	init.go();
})();
