/* global baguetteBox:false */

addEventHandler(window, "load", function () { // async load
    // https://github.com/feimosi/baguetteBox.js
    baguetteBox.run(".gallery", {
        buttons: true
    });

    querySelectAll(".gallery-entry a")
        .forEach(function ($a) {
            addEventHandler($a, "keydown", function (e) {
                if (e.code === "Space") {
                    e.preventDefault();  // prevent page down scroll
                    // trigger gallery after a small delay, as baguetteBox
                    // consumes the 'space' key to switch to another image
                    setTimeout(function () {
                        $a.click();
                    }, 200);
                }
            }, true);
        });
});
