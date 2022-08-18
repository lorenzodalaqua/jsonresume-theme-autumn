const fs = require('fs');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const webserver = require('gulp-webserver');
const del = require('del');

// Get file and directory names for build
const {
  VIEWS_DIR,
  PARTIALS_DIR,
  STYLES_DIR,
  OUTPUT_DIR,
  TEMPLATE_FILENAME,
  HTML_FILENAME,
  CSS_FILENAME,
  RESUME_PATH,
  FALLBACK_RESUME_PATH,
  helpers
} = require('./build-config');

/**
 * Build the CSS file for the resume using TailwindCSS through PostCSS
 */
function css() {
  return gulp
    .src(`${STYLES_DIR}/${CSS_FILENAME}`)
    .pipe(postcss())
    .pipe(gulp.dest(OUTPUT_DIR));
}

/**
 * Build the CSS file for checking in repository and saving as
 */
function cssExport() {
  return gulp
    .src(`${STYLES_DIR}/${CSS_FILENAME}`)
    .pipe(postcss())
    .pipe(gulp.dest(__dirname));
}

/**
 * Build the HTML from the resume file (either resume.json provided or a
 * default) and from the templates in views folder
 */
function html() {
  const jsonResume = fs.existsSync(RESUME_PATH)
    ? fs.readFileSync(RESUME_PATH, 'utf-8')
    : fs.readFileSync(FALLBACK_RESUME_PATH, 'utf-8');

  const resume = JSON.parse(jsonResume);

  const options = {
    ignorePartials: false,
    partials: {},
    batch: [PARTIALS_DIR],
    helpers: helpers
  };

  return gulp
    .src(`${VIEWS_DIR}/${TEMPLATE_FILENAME}`)
    .pipe(handlebars({ resume, stylesheet: `/${CSS_FILENAME}` }, options))
    .pipe(rename(HTML_FILENAME))
    .pipe(gulp.dest(OUTPUT_DIR));
}

/**
 * Run HTML and CSS tasks
 */
const build = gulp.series(css, html);

/**
 * Clean output directory
 */
function clean() {
  return del(`${OUTPUT_DIR}/*`);
}

/**
 * Watch for changes in templates, css and resume for interactive development
 */
function watch() {
  const TEMPLATES_GLOB = `${VIEWS_DIR}/**/*.hbs`;
  const STYLES_GLOB = `${STYLES_DIR}/*.css`;
  /**
   * HTML task watches for changes in templates and in resume file
   */
  gulp.watch([TEMPLATES_GLOB, RESUME_PATH, FALLBACK_RESUME_PATH], html);
  /**
   * CSS task needs to watch both styles and templates for tailwind to find
   * used class names
   */
  gulp.watch([TEMPLATES_GLOB, STYLES_GLOB], css);
}

/**
 * Serve the output directory containing HTML and CSS for interactive
 * development
 */
function server() {
  return gulp.src(OUTPUT_DIR).pipe(
    webserver({
      port: 8888,
      open: true
    })
  );
}

/**
 * Run the whole build process and keep watching for changes and serving
 * the output folder for a convenient development experience
 */
const dev = gulp.series(clean, build, gulp.parallel(server, watch));

module.exports = {
  cssExport,
  default: dev
};
