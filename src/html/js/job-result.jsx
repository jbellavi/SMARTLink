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

		api.call.getOpportunity(uid, id, init.success, init.failure);
		
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
		init.set("about", data.about);
		init.set("commitment", data.commitment);
		init.set("compensation", data.compensation);
		init.set("deadline", "Dealine: " + data.deadline);
		init.set("description", data.description);
		init.set("location", data.location);
		init.set("qualifications", data.qualifications);
		init.set("how-to-apply", data.howToApply);
		init.set("organization", data.organization);
		init.set("title", data.title);
		document.getElementById('link').href = data.link;
	};

	/**
	 * Called when the job is not found.
	 */
	init.failure = () => {
		let node = document.getElementById('content');

		while (node.hasChildNodes()) {
		    node.removeChild(node.lastChild);
		}

		node.appendChild(
			<div class="simple">
				<div class="title">
					Opportunity not found.
				</div>
				<div class="text">
					We're having trouble finding this opportunity. If you're at the right URL, this opportunity may no longer be available.
				</div>
			</div>
		);
	}

	// set everything in motion.
	init.go();
})();
