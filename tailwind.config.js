const { VIEWS_DIR } = require('./build-config');

module.exports = {
  content: [`${VIEWS_DIR}/**/*.hbs`],
  theme: {
    fontFamily: {
      sans: ['Ubuntu', 'ui-sans-serif', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
};
