const autoprefixer = require("gulp-autoprefixer"),
    concat = require("gulp-concat"),
    csso = require("gulp-csso"),
    del = require("del"),
    eslint = require("gulp-eslint"),
    fs = require("fs"),
    gulp = require("gulp"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    stylelint = require("gulp-stylelint"),
    uglify = require("gulp-uglify")
;


/* Linting tasks     - - - - - - - - - - - - - - - - - - - - */ /* eslint-disable-line indent */

gulp.task("lint_scripts", () => {
    return gulp.src([ "src/scripts/**/*.js" ])
        .pipe(eslint("eslintrc.js"))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    ;
});

gulp.task("lint_styles", () => {
    return gulp.src([ "src/styles/**/*.scss" ])
        .pipe(stylelint({
            failAfterError: true,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
    ;
});

gulp.task("lint", (done) => {
    return gulp.series(
        "lint_scripts",
        "lint_styles"
    )(done);
});


/* Clean build folder    - - - - - - - - - - - - - - - - - - */ /* eslint-disable-line indent */

// Note: by running this task, the 'build' folder is ensured to exist
gulp.task("clean", () => {
    return del([ "build" ])
        .then((deletedItems) => fs.mkdirSync("build"));
});


/* Build scripts resources   - - - - - - - - - - - - - - - - */ /* eslint-disable-line indent */

gulp.task("copy_vendor_scripts", () => {
    return gulp.src([ "src/vendors/**/*.js" ], { base: "src/vendors" })
        .pipe(gulp.dest("build/vendors"))
    ;
});

gulp.task("generate_scripts", () => {
    const ordered_sources = [
        "src/scripts/_common.js",
        "src/scripts/_specific.js",
        "src/scripts/**/*.js",
    ];

    return gulp.src(ordered_sources, { base: "src/scripts" })
        .pipe(concat("home.js"))
        .pipe(gulp.dest("build/js"))
    ;
});

gulp.task("minimize_scripts", () => {
    // Note : if a ".min" file already exists, then it will be overwritten
    const entries = [
        "build/**/*.js",
        "!build/**/*.min.js" // avoid already minified files
    ];
    const options = {
        compress: {
            global_defs: {
                "XMLHttpRequest.DONE": 4, // replace constant with value
            },
        },
        output: {
            comments: "/^!/", // preserve license comments starting with "!"
        }
    };

    return gulp.src(entries, { base: "build" })
        .pipe(rename((path) => {
            path.basename = path.basename + ".min"
        }))
        .pipe(uglify(options))
        .pipe(gulp.dest("build"))
    ;
});

gulp.task("build_scripts", gulp.series(
    "copy_vendor_scripts",
    "generate_scripts",
    "minimize_scripts"
));


/* Build styles resources    - - - - - - - - - - - - - - - - */ /* eslint-disable-line indent */

gulp.task("copy_vendor_styles", () => {
    return gulp.src([ "src/vendors/**/*.css" ], { base: "src/vendors" })
        .pipe(gulp.dest("build/vendors"))
    ;
});

gulp.task("generate_styles", () => {
    return gulp.src([ "src/styles/**/*.scss" ], { base: "src/styles" })
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        // .pipe(gulpif(!isEnvProd, sourcemaps.write("."))) // dumping source maps as external files
        .pipe(gulp.dest("build/css"))
    ;
});

gulp.task("minimize_styles", () => {
    // Note : if a ".min" file already exists, then it will be overwritten
    const entries = [
        "build/**/*.css",
        "!build/**/*.min.css" // avoid already minified files
    ];

    return gulp.src(entries, { base: "build" })
        .pipe(rename((path) => {
            path.basename = path.basename + ".min"
        }))
        .pipe(csso())
        .pipe(gulp.dest("build"))
    ;
});

gulp.task("build_styles", gulp.series(
    "copy_vendor_styles",
    "generate_styles",
    "minimize_styles"
));


/* Build tasks   - - - - - - - - - - - - - - - - - - - - - - */ /* eslint-disable-line indent */

gulp.task("build", (done) => {
    return gulp.series(
        "build_scripts",
        "build_styles"
    )(done);
});


/* Deploy built artifacts      - - - - - - - - - - - - - - - */ /* eslint-disable-line indent */


gulp.task("deploy_scripts", () => {
    return gulp.src([ "build/**/*.js" ], { base: "build" })
        .pipe(gulp.dest("docs"))
    ;
});

gulp.task("deploy_styles", () => {
    return gulp.src([ "build/**/*.css" ], { base: "build" })
        .pipe(gulp.dest("docs"))
    ;
});

gulp.task("deploy", (done) => {
    return gulp.series(
        "deploy_scripts",
        "deploy_styles"
    )(done);
});

