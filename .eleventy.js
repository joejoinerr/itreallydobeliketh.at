const speedDate = require('speed-date')
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(UpgradeHelper);

  // Allow top-level and page-level data to be combined
  eleventyConfig.setDataDeepMerge(true);

  // Copy files not usually handled
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/**/*.(jpg|jpeg|webp|png|svg|gif|mp4)')

  // Create a date filter so that I can use format strings
  eleventyConfig.addFilter('date', function(date, formatString) {
    return speedDate.cached(formatString, new Date(date));
  });

  return {
    dir: {
      input: 'src',
      layouts: '_layouts'
    }
  }
}
