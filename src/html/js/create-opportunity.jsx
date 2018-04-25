(() => {
    // container for initialization functions.
    let init = {};

    // wrapper for post functions
    let post = {};

    /**
     * Main initialization function. Called once when the page loads.
     */
    init.go = () => {
        document.getElementById('submit').onclick = post.go;
    };

    /**
     * Posts the new opportunity to the server.
     */
    post.go = () => {
        let uid = 0; // TODO: uid
        api.call.postOpportunity(uid, post.getData(), post.success, post.failure);
    };

    /**
     * Scrapes the user input off the page and returns it as an object ready to be sent to the API.
     */
    post.getData = () => {
        return {
            about: document.getElementById('about').value,
            commitment: document.getElementById('commitment').value,
            compensation: document.getElementById('compensation').value,
            deadline: document.getElementById('deadline').value,
            description: document.getElementById('description').value,
            location: document.getElementById('location').value,
            qualifications: document.getElementById('qualifications').value,
            how: document.getElementById('how').value,
            organization: document.getElementById('organization').value,
            title: document.getElementById('title').value,
            link: document.getElementById('link').value,
        };
    };

    /**
     * Called if the post request succeeds.
     *
     * @param data  the data returned from the API
     */
    post.success = (data) => {
        console.log(data);
        window.location.href = '/job-result.html#' + data.id;
    };


    /**
     * Called if the POST request fails or is not sent to the server.
     *
     * @param err  the reason for failure
     */
    post.failure = (err) => {
        if (typeof err.missing !== 'undefined') {
        console.log(err);
            for (let missing of err.missing) {
                document.getElementById(missing).classList.add('missing');
            }
        } else {
        console.log('failed');
            // TODO: display failure message.
        }
    };

    // sets the js in motion
    init.go();
})();
