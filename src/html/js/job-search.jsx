(() => {
	// wrapper for initialization functions
	let init = {};

	// wrapper for card creation functions
	let card = {};

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
		let uid = 0;
		let query = "marijuana";

		api.call.getOpportunities(uid, query, init.success, init.failure)
		
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
