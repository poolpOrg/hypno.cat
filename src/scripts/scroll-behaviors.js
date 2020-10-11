/* global Gumshoe:false */

// Scroll spy : highlight navigation link whose matching the section
// currently displayed
addEventHandler(window, "load", function () { // async load
    // https://github.com/cferdinandi/gumshoe
    /*var scrollSpy =*/ new Gumshoe("#top-header nav a", {
        navClass        : "active", // applied to the nav list item
        contentClass    : "active", // applied to the content

        // Offset & reflow
        offset          : getHeaderHeight, // how far from the top of the page to activate a content area
        reflow          : true, // if true, listen for reflows

        // Event support
        events          : false // if true, emit custom events
    });
});


// smooth scrolling, takes care of extra top padding introduced to have
// the content moved below the fixed top header
querySelectAll('a[data-smooth-scroll][href*="#"]:not([href="#"])') /* eslint-disable-line quotes */
    .forEach(function ($a) {
        addEventHandler($a, "click", function (e) {
            // hash is guaranteed by query selector
            // hash starts with '#'
            var $target = querySelect(this.hash),
                newScrollY;

            if ($target && location.hostname == this.hostname && location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "")) {
                newScrollY = getElemOffsetTop($target) - getHeaderHeight();
                window.scroll(window.scrollX, newScrollY);
                e.preventDefault();
                $target.focus();
            }
        });
    });


addEventHandler(window, "scroll", debounce(function (e) { /* eslint-disable-line no-unused-vars */
    // .v-scrolled is used to show / hide the top bar
    toggleElemClass(document.body, "v-scrolled", 0 < window.scrollY);
    // .below-fold is used to show / hide the bottom image
    toggleElemClass(document.body, "below-fold", (getHeroHeight() - getHeaderHeight()) <= window.scrollY);
}));
