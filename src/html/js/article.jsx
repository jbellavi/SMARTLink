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

		api.call.getOpportunity(uid, id, init.success, init.failure)
		
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
	 */
	init.success = (data) => {
		//title
		// author
		// date
		// content
		// via
	};

	/**
	 * Called when the job is not found.
	 */
	init.failure = () => {
		// TODO: 
	}

	// set everything in motion.
	init.go();
})();
