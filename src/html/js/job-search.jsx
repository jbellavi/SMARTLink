(() => {
	// wrapper for initialization functions
	let init = {
		// container for filter initialization functions
		filter: {}
	};

	// wrapper for filter functions
	let filter = {
		// the list of filters
		list: [
			"internships",
			"research",
			"people",
		],
	};

	// wrapper for card creation functions
	let card = {};

	/**
	 * Initializes the filter menu.
	 */
	init.filter = () => {
		for (let name of filter.list) {
			document.getElementById(name + '-checkbox').onchange = init.load;
		}
	};

	/**
	 * Main initialization function.
	 */
	init.go = () => {
		init.load();
		init.filter();
	};

	/**
	 * Fetches the data from the API and puts it on the page.
	 */
	init.load = () => {
		let url = window.location.href;

		// TODO: get the query and UID from somewhere
		let uid = 0;
		let query = "marijuana";
		let filters = filter.get();
		console.log(filters);

		let node = document.getElementById('results');

		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}

		api.call.getOpportunities(uid, query, filters, init.success, init.failure)
		
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
	init.success = (cards) => {
		let results = document.getElementById('results');

		if (cards.length === 0) {
			// no results found.
			init.failure();
			return;
		}

		for (let cardData of cards) {
			let cardNode = card.make(cardData)

			results.appendChild(cardNode);
		}
	};

	/**
	 * Creates and returns a card of any type.
	 */
	card.make = (data) => {
		switch (data.type) {
			case "opportunity":
				return card.opportunity(data);

			case "person":
				return card.person(data);
		}
	}

	/**
	 * Creates and returns a job opportunity card.
	 */
	card.opportunity = (job) => {
		let url = "job-result.html#" + job.id;

		return (
			<div class="job">
	            <h3 class="job-title">{job.title}</h3>
	            <p class="job-description">{job.organization}</p>
	            <p class="job-description">{job.location}</p>
	            <p class="job-description">{job.compensation}</p>
	            <p class="job-description">Application Deadline: {job.deadline}</p>
	            <div class="job-interact">
	                <a href={url} class="read-more">Read More</a>
	                <a href={job.link} class="apply">Apply</a>
	            </div>
	        </div>
        );
	};

	/**
	 * Creates and returns a person card. 
	 */
	card.person = (person) => {
		let url = "person-result.html#" + person.id;
		let email = "mailto:" + person.email;

		return (
			<div class="job">
				<h3 class="job-title">{person.name}</h3>
				<p class="job-description">{person.title}</p>
				<p class="job-description">{person.organization}</p>
				<p class="job-description">{person.location}</p>
	            <div class="job-interact">
	                <a href={url} class="read-more">See Profile</a>
	                <a href={email} class="apply">Contact</a>
	            </div>
	        </div>
        );
	};

	/**
	 * Gets an array of the filters which are currently enabled.
	 */
	filter.get = () => {
		return {
			internships: filter.checked('internships'),
			research:    filter.checked('research'),
			people:      filter.checked('people'),
		}
	}

	/**
	 * Returns the checked status of the filter with the given name.
	 *
	 * @param name  the id of the filter
	 */
	filter.checked = (id) => {
		return document.getElementById(id + '-checkbox').checked;
	}

	/**
	 * Called when the job is not found.
	 */
	init.failure = () => {
		// TODO: 
		let node = document.getElementById('results');

		results.appendChild(
			<div class="simple">
				<div class="no-results">
					No results found.
				</div>
			</div>
		);
	};

	// set everything in motion.
	init.go();
})();
