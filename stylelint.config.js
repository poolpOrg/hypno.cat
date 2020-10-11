/* eslint-disable */

// Using stylelint + stylelint-scss
// rules based on stylelint-config-sass-guidelines
//
// https://medium.com/@bjankord/how-to-lint-scss-with-stylelint-dc87809a9878
//
// https://github.com/stylelint/stylelint
// https://github.com/kristerkari/stylelint-scss
// https://github.com/bjankord/stylelint-config-sass-guidelines

module.exports = {
    "extends": "stylelint-config-sass-guidelines",

    "plugins": [
        "stylelint-scss"
    ],

    "rules": {
        "indentation": 4, // same indentation as source code: one size fits all
        "max-nesting-depth": [
            2,
            {
                ignore: ["blockless-at-rules"]
            }
        ],
        "selector-class-pattern": [
            "^[a-z0-9\\-]+$",
            {
                "message": "Selector should be written in lowercase with hyphens (selector-class-pattern)",
                "severity": "warning"
            }
        ],
        "selector-list-comma-newline-after": "always-multi-line",
        "selector-max-compound-selectors": 5,
        "selector-max-id": 1,
        "string-quotes": "double",
    }
};

/* eslint-enable */
