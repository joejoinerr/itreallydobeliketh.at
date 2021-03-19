module.exports = function(eleventyConfig) {
  // Allow top-level and page-level data to be combined
  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: 'src',
      layouts: '_layouts'
    }
  }
}
