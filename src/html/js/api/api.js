// this JS file creates an API variable, which is publically exposed
// to be used in other files.
// This file is automatically bundled into all pages, so the api object
// is available from any js file in the project.
let api = {
	// Used to call individual API functions.
	call: {},
};

(() => {
	// the base URL to prepend to all API requests.
	const BASE_URL = "localhost:8080";
	const call = api.call;
	const dummy = new DummyAPI();

	// IIFE so we don't expose the post or get functions--we don't want them being
	// called directly. Instead, they are used by the functions in api.call, which
	// are all just proxies for post and get. The api.call function ensure that the
	// correct arguments are being passed to the correct endpoints using the correct
	// methods (POST/GET/etc.).

	/**
	 * POSTs a message to the server, then calls callback, passing it the
	 * the server's response. This response consists of a boolean
	 * indicating whether the function succeeded or not, and the actual data
	 * returned, which varies for each API call.
	 *
	 * @param endpoints  the API endpoint on the server
	 * @param data       the data to send with the request
	 * @param success    the function to call when the API call returns
	 *                   successfully
	 * @param failure    the function to call when the API call returns
	 *                   unsuccessfully
	 */
	let post = (endpoint, data, success, failure) => {
		request(endpoint, "POST", data, success, failure);
	};

	/**
	 * GETs a message to the server, then calls callback, passing it the
	 * the server's response. This response consists of a boolean
	 * indicating whether the function succeeded or not, and the actual data
	 * returned, which varies for each API call.
	 *
	 * @param endpoints  the API endpoint on the server
	 * @param data       the data to send with the request
	 * @param success    the function to call when the API call returns
	 *                   successfully
	 * @param failure    the function to call when the API call returns
	 *                   unsuccessfully
	 */
	let get = (endpoint, data, success, failure) => {
		request(endpoint, "GET", data, success, failure);
	};

	/**
	 * Combines the endpoint with the data to form
	 * a url string to use in the fetch request.
	 *
	 * @param endpoint  the endpoint to call
	 * @param data      the data to encode
	 */
	let formUrl = (endpoint, data) => {
		// https://stackoverflow.com/a/34209399/3453504
		var esc = encodeURIComponent;
		var query = Object.keys(data)
		    .map(k => esc(k) + '=' + esc(data[k]))
		    .join('&');

		return BASE_URL + '/' + endpoint + '?' + query;
	}

	/**
	 * Sends any method of request to the server, then
	 * calls the appropriate callback when the request returns.
	 *
	 * @param endpoints  the API endpoint on the server
	 * @param method     the method to use to call the endpoint (POST/GET/etc.)
	 * @param data       the data to send with the request
	 * @param success    the function to call when the API call returns
	 *                   successfully
	 * @param failure    the function to call when the API call returns
	 *                   unsuccessfully
	 */
	let request = (endpoint, method, data, success, failure) => {
		// https://stackoverflow.com/a/8567149/3453504
		let req = new XMLHttpRequest();

		let url = BASE_URL + '/' + method;

		request.onreadystatechange = function() {
			if (req.readyState == XMLHttpRequest.DONE) {
				if (req.status == 200) {
					// 200 OK
					res = JSON.parse(req.responseText);

					if (res.success) {
						success(res.data);
					} else {
						failure(res.data);
					}
				} else if (req.status == 400) {
					// 400 ERROR
					console.log('ERROR: API call returned 400.');
					console.log(endpoint, method, data);
				} else {
					console.log('ERROR: API returned unexpected status ' + req.status + '.');
					console.log(endpoint, method, data);
				}
			}
		};

		req.open(method, url, true);
		req.send();
	}

	/**
	 * Returns an error if any fields are missing.
	 *
	 * @param data            the data to verify
	 * @param mandatorFields  the fields which must exist to avoid returning an error
	 * @return                undefined if all required fields exist, or a list
	 *                        of missing fields in the case of an error
	 */
	let require = (data, mandatoryFields) => {
		missing = [];

		for (let field of mandatoryFields) {
			if (typeof data[field] === 'undefined') {
				missing.push(field);
			}
		}

		return missing.length === 0 ? undefined : missing;
	};


	/**
	 * GETs a list of all sections on the LEARN page.
	 *
	 * @param success    the function to call when the API call returns
	 *                   successfully
	 * @param failure    the function to call when the API call returns
	 *                   unsuccessfully
	 */
	call.getSections = (success, failure) => {
		// get("section", {section}, success, failure);
		dummy.success(success, dummy.getSectionsRes());
		// dummy.success(failure, {});
	};

	/**
	 * GETs an array of all articles in a given section of the LEARN page.
	 *
	 * @param section    the section to look up
	 * @param success    the function to call when the API call returns
	 *                   successfully
	 * @param failure    the function to call when the API call returns
	 *                   unsuccessfully
	 */
	call.getArticles = (section, success, failure) => {
		// get("section", {section}, success, failure);
		dummy.success(success, dummy.getArticlesRes());
		// dummy.success(failure, {});
	};

	/**
	 * GETs a single article.
	 *
	 * @param id         the id of the article
	 * @param success    the function to call when the API call returns
	 *                   successfully
	 * @param failure    the function to call when the API call returns
	 *                   unsuccessfully
	 */
	call.getArticle = (id, success, failure) => {
		// get("article", {id}, success, failure);
		dummy.success(success, dummy.getArticleRes());
		// dummy.success(failure, {});
	};

	/**
	 * GETs the list of available regional google calendars.
	 *
	 * @param uid      the id of the user making the request
	 * @param success  the function to call when the API call returns
	 *                 successfully
	 * @param failure  the funcction to call when the API call returns
	 *                 unsuccesfully
	 */
	call.getCalendars = (uid, success, failure) => {
		// get("calendars", success, failure);
		dummy.success(success, dummy.getCalendarsRes());
		// dummy.success(failure, []);
	};

	/**
	 * Gets search results for a search on the connect page.
	 *
	 * @param uid      the id of the user making the search
	 * @param query    the search query
	 * @param filters  the filters to apply to the query
	 * @param success  the function to call when the API call returns
	 *                 successfully
	 * @param failure  the function to call when the API call returns
	 *                 unsuccessfully
	 */
	call.getOpportunities = (uid, query, filters, success, failure) => {
		// get("opportunities", {uid, query, filters}, success, failure);
		dummy.success(success, dummy.getOpportunitiesRes());
		// dummy.success(failure, {});
		// dummy.success(success, []);
	};

	/**
	 * Gets all the data for a single opportunity page.
	 *
	 * @param uid      the id of the user making the request
	 * @param id       the id of the opportunity being fetched
	 * @param success  the function to call when the API call returns
	 *                 successfully
	 * @param failure  the function to call when the API call returns
	 *                 unsuccessfully
	 */
	call.getOpportunity = (uid, id, success, failure) => {
		// get("opportunity", {uid, id}, success, failure);
		dummy.success(success, dummy.getOpportunityRes());
		// dummy.success(failure, {});
	};

	/**
	 * Gets all the data for a single person page.
	 *
	 * @param uid      the id of the user making the request
	 * @param id       the id of the person being fetched
	 * @param success  the function to call when the API call returns
	 *                 successfully
	 * @param failure  the function to call when the API call returns
	 *                 unsuccessfully
	 */
	call.getPerson = (uid, id, success, failure) => {
		// get("person", {uid, id}, success, failure);
		dummy.success(success, dummy.getPersonRes());
		// dummy.success(failure, {});
	};

	/**
	 * Creates a new opportunity.
	 *
	 * @param uid   the id of the user making the request
	 */
	call.createOpportunity = (uid, data, success, failure) => {
		const MANDATORY = [
			'about',
			'commitment',
			'compensation',
			'deadline',
			'description',
			'location',
			'qualifications',
			'howToApply',
			'organization',
			'title',
			'link',
		];

		data.uid = uid;

		let missing =  require(data, MANDATORy);

		if (typeof missing === 'undefined') {
			post("opportunity", data, success, failure);
		} else {
			failure({missing});
		}
	}
})();
