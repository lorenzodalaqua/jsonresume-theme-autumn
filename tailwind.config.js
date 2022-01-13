const { VIEWS_DIR } = require('./build-config');

module.exports = {
  content: [`${VIEWS_DIR}/**/*.hbs`],
  theme: {
    extend: {}
  },
  plugins: []
};
