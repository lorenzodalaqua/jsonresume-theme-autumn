const lookup = require('country-code-lookup');
const formatDate = require('date-fns/format');

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
  FALLBACK_RESUME_PATH: __dirname + '/resume-sample.json',
  helpers: {
    uppercase: function (str) {
      return str.toUpperCase();
    },
    lowercase: function (str) {
      return str.toLowerCase();
    },
    removeProtocol: function (url) {
      const regex = /^.+:\/\/(.*)/i; // ignore case
      const match = url.match(regex);
      if (match && match[1]) {
        return match[1].replace(/^[\/]+|[\/]+$/g, '');
      } else {
        return url;
      }
    },
    concat: function (...args) {
      // Last element seems to be some handlebars internal object, so just remove it
      const items = args.slice(0, -1);
      return items.join('');
    },
    array: function (...args) {
      // Last element seems to be some handlebars internal object, so just remove it
      return args.slice(0, -1);
    },
    formatAddress: function (location) {
      const { address, city, region, countryCode, postalCode } = location;
      let text = '';
      /**
       * I prefer to only list the city, region and country, but if you want to
       * show the whole address just uncomment  the lines for each address part.
       */
      //if (address) text += `${address}, `;
      if (city) text += city;
      if (region) text += `, ${region}`;
      if (countryCode) {
        const found = lookup.byIso(countryCode);
        if (found) {
          text += `, ${found.country}`;
        }
      }
      // if (postalCode) text += `, ${postalCode}`;
      return text;
    },
    formatDate: function (string) {
      const date = new Date(`${string} 00:00:01`);
      return formatDate(date, 'MMM yyyy');
    }
  }
};
