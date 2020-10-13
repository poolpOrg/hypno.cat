## TL; DR

    $ cd hypno.cat
    $ npm install
    ...
    $ npm run build
    ...
    $ cp docs path/to/docs


## Content quick description

Build is performed by Gulp, take a look at the `gulpfile.js`

Sources for both javascript and CSS are stored in the `src` folder.

For javascript, files from `src/scripts` are concatenated into a single file (`home.js`)

For CSS, SaSS preprocessor takes care of producing the css file (`home.css`) from `src/styles`

Vendors script and styles are copied nearly as is from `src/vendors`

`src/resources` is just a backup storage for assets
