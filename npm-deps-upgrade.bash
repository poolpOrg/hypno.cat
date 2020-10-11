#!/bin/bash

# About set command
# `-e` option will cause a bash script to exit immediately when a command fails
# `-u` option will cause an immediate exit upon encountering an unset variable.
# `-o pipefail` will prevent piping from causing non-zero exit codes to be ignored.
# https://vaneyckt.io/posts/safer_bash_scripts_with_set_euxo_pipefail/
set -euo pipefail

# -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

# Let's face it, upgrading node modules is a pain.
# Be dumb ! delete all modules then install the last versions

echo " ** Uninstall all modules"
echo

# uninstall all modules, cleans package.json
#
# > https://stackoverflow.com/a/24396148
# How do you uninstall all dependencies listed in package.json
npm uninstall `ls -1 ./node_modules | tr '/\n' ' '`

rm -rf ./node_modules || true
rm -f  ./package-lock.json || true

echo

# -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

# let's start anew

echo " ** Re-install modules"
echo

# Build tools

## Cross platform commands (cp / mv / rm ...)
npm install --save-dev del shelljs


## Gulp
npm install --save-dev gulp gulp-cli gulp-concat gulp-rename


## CSS tools
npm install --save-dev autoprefixer gulp-autoprefixer
npm install --save-dev browserslist
npm install --save-dev csso gulp-csso
npm install --save-dev gulp-sass

## CSS linting
npm install --save-dev stylelint stylelint-config-sass-guidelines stylelint-order stylelint-scss gulp-stylelint


## JS tools
npm install --save-dev uglify-js
npm install --save-dev gulp-uglify

## JS Linting
npm install --save-dev eslint gulp-eslint eslint-plugin-compat


# Actual project dependencies (i.e. for runtime)

## JS deps
npm install --save gumshoejs
npm install --save baguettebox.js


## CSS deps
npm install --save normalize.css


# -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

echo " ** ALL DONE !!!"
echo

#EOF
