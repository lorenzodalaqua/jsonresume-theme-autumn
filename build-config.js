// Files and directories used in the build process
module.exports = {
  VIEWS_DIR: __dirname + '/views',
  PARTIALS_DIR: __dirname + '/views/partials',
  STYLES_DIR: __dirname + '/styles',
  OUTPUT_DIR: __dirname + '/public',

  TEMPLATE_FILENAME: 'resume.hbs',
  HTML_FILENAME: 'index.html',
  CSS_FILENAME: 'resume.css',

  RESUME_PATH: __dirname + '/resume.json',
  FALLBACK_RESUME_PATH: __dirname + '/resume-sample.json'
};
