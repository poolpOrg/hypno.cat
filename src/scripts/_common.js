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
