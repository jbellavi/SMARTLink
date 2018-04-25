(() => {
    // container for initialization functions.
    let init = {
        // container for calendar initialization functions.
        cal: {},
    };

    // container for calendar functions.
    let calendar = {};

    /**
     * Initializes the page.
     */
    init.go = () => {
        init.load();
    };

    /**
     * Fetches the data from the API and puts it on the page.
     */
    init.load = () => {
        let uid = 0;
        // TODO: get uid from somewhere
        api.call.getCalendars(uid, init.success, init.failure);
    };

    /**
     * Called when the api returns successfully.
     *
     * @param data  the raw API data
     */
    init.success = (data) => {
        calendar.load(data[0]);
        init.cal.options(data);
    };

    /**
     * Creates the options in the city-select menu.
     *
     * @param data  the raw API data
     */
    init.cal.options = (data) => {
        let node = document.getElementById('city-select');

        for (let cal of data) {
            node.appendChild(
                <option class="city-option">{cal.name}</option>
            );
        }
    }

    /**
     * Called when the API returns unsuccessfully.
     */
    init.failure = () => {
        let node = document.getElementById('calendar');

        node.appendChild(
            <div class="simple">
                <div class="title">
                    Could not load calendar.
                </div>
                <div class="text">
                    This calendar may have been removed. We apologize for any inconvenience.
                </div>
            </div>
        );
    };

    /**
     * Loads the calendar from google.
     *
     * @param cal  the api object for the calendar to be used
     */
    calendar.load = (cal) => {
        let code = cal.iframe;
        let iframe = '<iframe src="https://calendar.google.com/calendar/b/1/embed?showTitle=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src='
            + code 
            + '&amp;color=%230F4B38&amp;ctz=America%2FNew_York" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>';

        document.getElementById('calendar').innerHTML = iframe;
    }

    // sets the js in motion
    init.go();
})();
