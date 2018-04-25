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

        api.call.getPerson(uid, id, init.success, init.failure);
        
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
        init.set("name", data.name);
        init.set("title", data.title);
        init.set("organization", data.organization);
        init.set("location", data.location);
        init.set("biography", data.biography);
        init.set("organization", data.organization);
        document.getElementById('link').href = "mailto:" + data.email;
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
                    user not found.
                </div>
                <div class="text">
                    We're having trouble finding this user. If you're at the right URL, this user may no longer exist.
                </div>
            </div>
        );
    }

    // set everything in motion.
    init.go();
})();
