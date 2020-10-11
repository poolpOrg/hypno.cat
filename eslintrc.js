/* eslint-disable */

module.exports = {
    "env": {
        "browser": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:compat/recommended"
    ],
    "globals": {
        // Declaring globals, about values
        // `false` means "read only"
        // `true` means "write-able"
        "addEventHandler"               : false,
        "debounce"                      : false,
        "dispatchCustomEvent"           : false,
        "elemHasClass"                  : false,
        "getElemOffsetTop"              : false,
        "getAttr"                       : false,
        "querySelect"                   : false,
        "querySelectAll"                : false,
        "setAttr"                       : false,
        "toggleElemClass"               : false,

        "getHeaderHeight"               : false,
        "getHeroHeight"                 : false,
    },
    "rules": {
        "indent": [
            "warn",
            4,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console": "warn",
        "no-debugger": "warn",
        "no-empty": "warn",
        "no-unused-vars": [
            "warn",
            { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "vars-on-top": "warn"
    }
};

/* eslint-enable */
