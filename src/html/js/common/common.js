(() => {
    // wrapper for initialization functions.
    let init = {
        // wrapper for nav initialization functions
        nav: {},
    };

    // wrapper for navbar functions
    let nav = {};

    /**
     * Primary initilization function.
     */
    init.go = () => {
        init.nav.go();
    };

    /**
     * Initializes the navigation menu.
     */
    init.nav.go = () => {
        document.getElementById('hamburger').onclick = nav.show;
        document.getElementById('nav-close').onclick = nav.hide;
    };

    nav.show = () => {
        document.getElementById('nav').classList.add('visible');
    };

    nav.hide = () => {
        document.getElementById('nav').classList.remove('visible');
    };

    init.go();
})();