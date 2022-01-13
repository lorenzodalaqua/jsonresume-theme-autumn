const fs = require('fs');
const handlebars = require('handlebars');
const wax = require('handlebars-wax');

// Get file and directory names for build
const {
  VIEWS_DIR,
  PARTIALS_DIR,
  TEMPLATE_FILENAME,
  CSS_FILENAME
} = require('./build-config');

function render(resume) {
  const Handlebars = wax(handlebars);
  const css = fs.readFileSync(`${__dirname}/${CSS_FILENAME}`, 'utf-8');
  const resumeTemplate = fs.readFileSync(
    `${VIEWS_DIR}/${TEMPLATE_FILENAME}`,
    'utf-8'
  );

  Handlebars.partials(`${PARTIALS_DIR}/*.hbs`);

  return Handlebars.compile(resumeTemplate)({
    css: css,
    resume: resume
  });
}

module.exports = {
  render: render
};
