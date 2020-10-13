/**
 * Shortcut for `$elem.addEventListener(type, listenerFn, useCapture)`.
 * <br />The function's name is different on purpose :
 * `window.addEventListener()` won't be overwritten.
 *
 * @param {Element} $elem
 * @param {string} type
 * @param {Function} listenerFn
 * @param {boolean | object} useCapture (optional)
 */
function addEventHandler($elem, type, listenerFn, useCapture) { /* exported addEventHandler */ /* eslint-disable-line no-redeclare */
    // if `useCapture` is undefined or null, then an explicit boolean
    // value (id est `false`) will be given to `addEventListener()`
    // Otherwise, the parameter is given as is, which allows options
    // to be passed.
    $elem && $elem.addEventListener(type, listenerFn, useCapture != null && useCapture);
}


function debounce(func) { /* exported debounce */ /* eslint-disable-line no-redeclare */
    var timeout;

    return function () {
        var that, fnArgs;

        that = this;
        fnArgs = arguments;

        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function () {
            func.apply(that, fnArgs);
        });
    };
}


/**
 * Dispatches a custom event from given emitter.
 * <br />The `eventParams` parameter can be used to pass `bubbles`,
 *  `cancelable` or `detail` properties.
 *
 * @param {EventTarget} $emitter
 * @param {string} typeArg
 * @param {Object} eventParams (optional)
 * @returns {boolean} value returned by $emitter.dispatchEvent
 */
function dispatchCustomEvent($emitter, typeArg, eventParams) { /* exported dispatchCustomEvent */ /* eslint-disable-line no-redeclare */
    return $emitter.dispatchEvent(
        new CustomEvent(typeArg, eventParams)
    );
}


/**
 * Checks whether the given element has the following CSS class.
 * <br />If <code>null</code> is given as <code>$elem</code> then nothing
 * happens.
 *
 * @param {Element} $elem
 * @param {String} cName
 * @returns {boolean}
 */
function elemHasClass($elem, cName) { /* exported elemHasClass */ /* eslint-disable-line no-redeclare */
    return $elem && $elem.classList.contains(cName);
}


function getElemOffsetTop($elem) { /* exported getElemOffsetTop */ /* eslint-disable-line no-redeclare */
    var offsetTop = 0;

    if ($elem.offsetParent) {
        do {
            offsetTop = offsetTop + $elem.offsetTop;
            $elem = $elem.offsetParent;
        } while ($elem);
    }
    return Math.max(0, offsetTop);
}


/**
 * Shortcut for `$elem.getAttribute(attr)`, reduces browsers discrepancy
 * regarding missing attributes (most returns an empty string, but some may
 * return `null`).
 *
 * If given `$elem` is null (or falsy), then an empty string will be returned.
 *
 * @param {Element} $elem
 * @param {string} attr
 * @returns {string}
 */
function getAttr($elem, attr) { /* exported getAttr */ /* eslint-disable-line no-redeclare */
    return ($elem && $elem.getAttribute(attr)) || "";
}


/**
 * Shortcut for `$elem.querySelector(selectors)`.
 * This function handles a variable number of parameters, if only one is
 * given, then the target element is assumed to be `document`.
 *
 * @param {Element} $elem (optional)
 * @param {string} selectors
 * @returns {Node|null}
 */
function querySelect($elem, selectors) { /* exported querySelect */ /* eslint-disable-line no-redeclare */
    if (arguments.length < 2) {
        selectors = $elem;
        $elem = document;
    }
    return $elem.querySelector(selectors);
}


/**
 * Shortcut for `$elem.querySelectorAll(selectors)`.
 * This function handles a variable number of parameters, if only one is
 * given, then the target element is assumed to be `document`.
 * <br \>Unlike `Element.querySelectorAll()` an array of `Node` is returned
 * (instead of a `NodeList`).
 *
 * @param {Element} $elem (optional)
 * @param {string} selectors
 * @returns {Node[]}
 */
function querySelectAll($elem, selectors) { /* exported querySelectAll */ /* eslint-disable-line no-redeclare */
    if (arguments.length < 2) {
        selectors = $elem;
        $elem = document;
    }
    // returning an Array of Node instead of a NodeList
    return [].slice.call($elem.querySelectorAll(selectors));
}


/**
 * Shortcut for `$elem.setAttribute(attr)`, a `null` or `undefined` value
 * causes the attribute to be removed from the markup of the element
 * (instead of recording `"null"`).
 *
 * @param {Element} $elem
 * @param {string} attr
 * @param {string | null} value
 */
function setAttr($elem, attr, value) { /* exported setAttr */ /* eslint-disable-line no-redeclare */
    // Note: "" != null
    // only `null` or `undefined` values will trigger `removeAttribute()`
    $elem && ( (value != null) ? $elem.setAttribute(attr, value) : $elem.removeAttribute(attr) );
}


/**
 * Activates / deactivates a css class on the given Element.
 * If `null` is given as `$elem` then nothing happens.
 *
 * @param {Element} $elem
 * @param {String}  cName
 * @param {boolean} isOn
 */
function toggleElemClass($elem, cName, isOn) { /* exported toggleElemClass */ /* eslint-disable-line no-redeclare */
    // Sadly there's no IE support for the force param of classList.toggle()...
    if ($elem) {
        isOn ? $elem.classList.add(cName) : $elem.classList.remove(cName);
    }
}

function getHeaderHeight() {  /* exported getHeaderHeight */ /* eslint-disable-line no-redeclare */
    var $header = document.getElementById("top-header");
    return $header ? $header.clientHeight : 0;
}


function getHeroHeight() {  /* exported getHeroHeight */ /* eslint-disable-line no-redeclare */
    var $header = document.getElementById("hero");
    return $header ? $header.clientHeight : 0;
}


(function (addEventHandlerFn, getAttrFn, querySelectAllFn, setAttrFn) {
    "use strict";

    function isAriaExpanded($elem) {
        return getAttrFn($elem, "aria-expanded") === "true";
    }


    function updateFoldableElem($toggle, isExpanded) {
        var elemiId = getAttrFn($toggle, "aria-controls"),
            $foldableElem = elemiId ? document.getElementById(elemiId) : 0
        ;
        setAttrFn($toggle, "aria-expanded", isExpanded);
        if ($foldableElem) {
            setAttrFn($foldableElem, "aria-hidden", !isExpanded);
        }
        return $foldableElem;
    }


    querySelectAllFn(".foldable-toggle")
        .forEach(function ($toggle) {
            // Startup : ensure that the markup is coherent with the state
            var $foldableElem = updateFoldableElem($toggle, isAriaExpanded($toggle));

            // on click on toggle : switch foldable state
            addEventHandlerFn($toggle, "click", function (e) { /* eslint-disable-line no-unused-vars */
                updateFoldableElem($toggle, !isAriaExpanded($toggle));
            });

            // on custom 'closeFoldable' event : close (duh!)
            addEventHandlerFn($foldableElem, "closeFoldable", function (e) { /* eslint-disable-line no-unused-vars */
                updateFoldableElem($toggle, false);
            });
        });

}(addEventHandler, getAttr, querySelectAll, setAttr));


// close ephemeral panels on outside click
addEventHandler(document.body, "click", function (e) {
    if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    if (e.target.closest(".foldable-toggle")) {
        // click on foldable toggle, those are typically outside foldable elements
        // improvement : detect foldable target and close elements that don't match
        return;
    }
    querySelectAll(".foldable-element.foldable-ephemeral")
        .forEach(function ($foldableElem) {
            if (!$foldableElem.contains(e.target)) {
                dispatchCustomEvent($foldableElem, "closeFoldable");
            }
        });
});


// close ephemeral panels on 'esc' key press
addEventHandler(window, "keydown", function (e) {
    if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    if (/^Esc(?:ape)/.test(e.key)) {
        querySelectAll(".foldable-element.foldable-ephemeral")
            .forEach(function ($foldableElem) {
                dispatchCustomEvent($foldableElem, "closeFoldable");
            });
    }
});


// close ephemeral panel when a inside link is clicked
querySelectAll(".foldable-element.foldable-ephemeral")
    .forEach(function ($foldableElem) {
        querySelectAll($foldableElem, "a")
            .forEach(function ($link) {
                addEventHandler($link, "click", function (e) { /* eslint-disable-line no-unused-vars */
                    dispatchCustomEvent($foldableElem, "closeFoldable");
                });
            });
    });

/* global baguetteBox:false */

addEventHandler(window, "load", function () { // async load
    // https://github.com/feimosi/baguetteBox.js
    baguetteBox.run(".gallery", {
        buttons: true
    });
});

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
