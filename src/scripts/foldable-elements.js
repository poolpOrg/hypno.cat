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
