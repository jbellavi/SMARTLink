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
	init.success = (jobs) => {
		let results = document.getElementById('results');

		for (let job of jobs) {
			let url = "job-result.html#" + job.id;

			results.appendChild(
				<div class="job">
		            <h3 class="job-title">{job.title}</h3>
		            <p class="job-description">{job.organization}</p>
		            <p class="job-description">{job.location}</p>
		            <p class="job-description">{job.compensation}</p>
		            <p class="job-description">application deadline: {job.deadline}</p>
		            <div class="job-interact">
		                <a href={url} class="read-more">Read More</a>
		                <a href={job.link} class="apply">Apply</a>
		            </div>
		        </div>
			);
		}
	};

	/**
	 * Called when the job is not found.
	 */
	init.failure = () => {
		// TODO: 
	};

	// set everything in motion.
	init.go();
})();
