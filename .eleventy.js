const speedDate = require('speed-date');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const site = require('./src/_data/site')();

module.exports = function(eleventyConfig) {
  // Install plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  // Allow top-level and page-level data to be combined
  eleventyConfig.setDataDeepMerge(true);

  // Copy files not usually handled
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/**/*.(jpg|jpeg|webp|png|svg|gif|mp4)')

  // Create a date filter so that I can use format strings
  eleventyConfig.addFilter('date', function(date, formatString) {
    return speedDate.cached(formatString, new Date(date));
  });

  // Create an absolute URL filter
  eleventyConfig.addFilter('fullurl', function(url) {
    return new URL(url, site.root).href;
  });

  eleventyConfig.addCollection("sitemap", function(collectionApi) {
    return collectionApi.getAll().filter(function(item) {
      let inSitemap = !item.data.canonical && !item.data.noindex && !item.data.excludeFromSitemap;
      return inSitemap;
    });
  });

  // Set Markdown options
  let markdownIt = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true
  });
  markdownIt.use(require('markdown-it-container'), 'note');
  eleventyConfig.setLibrary("md", markdownIt);

  return {
    dir: {
      input: 'src',
      layouts: '_layouts'
    }
  }
}
