/* global baguetteBox:false */

addEventHandler(window, "load", function () { // async load
    // https://github.com/feimosi/baguetteBox.js
    baguetteBox.run(".gallery", {
        buttons: true
    });
});
