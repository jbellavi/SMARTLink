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

		api.call.getArticle(id, init.success, init.failure);
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
	 * Called when the article is found.
	 *
	 * @param data  the data returned by the API.
	 */
	init.success = (data) => {
		init.set("title", data.title);
		init.set("author", typeof data.author === 'undefined' ? "" : "by " + data.author);
		init.set("date", data.date);

		let img = 'url("' + data.image + '")';
		document.getElementById('image').style.backgroundImage = img;

		init.content(data.content);
	};

	/**
	 * Generates the article content HTML.
	 *
	 * @param content
	 */
	init.content = (content) => {
		let node = document.getElementById('article-body');

		for (let paragraph of content.split('\n')) {
			node.appendChild(<p class="paragraph">{paragraph}</p>);
		}
	};

	/**
	 * Called when the article is not found.
	 */
	init.failure = () => {
		// TODO:
		init.success({
			title: "Article not found",
			image: "/asset/article-not-found.jpg",
			date: "",
			content: "Please make sure you have the correct url.",
		});
	};

	// set everything in motion.
	init.go();
})();
