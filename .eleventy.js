const { DateTime } = require('luxon')

module.exports = function(eleventyConfig) {
  // Allow top-level and page-level data to be combined
  eleventyConfig.setDataDeepMerge(true);

  // Create a date filter so that I can use format strings
  eleventyConfig.addFilter('date', function(date, formatString) {
    return DateTime.fromISO(date).toFormat(formatString);
  });

  return {
    dir: {
      input: 'src',
      layouts: '_layouts'
    }
  }
}
