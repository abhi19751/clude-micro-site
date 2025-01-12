const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

 
  eleventyConfig.addDataExtension("json", contents => JSON.parse(contents));


  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://your-domain.com",
    },
  });

  eleventyConfig.addFilter("translate", function(key, locale) {
    try {
      return locale[key] || key;
    } catch (e) {
      return key;
    }
  });

 
  eleventyConfig.addCollection("pages", function(collection) {
    return collection.getFilteredByGlob("src/pages/**/*.njk");
  });

  return {
    dir: {
      input: "src",             
      output: "_site",          
      includes: "_includes",    
      layouts: "_includes",     
      data: "_data"            
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};


module.exports.watch = [
  "src/**/*.njk",
  "src/**/*.md",
  "src/**/*.json",
  "src/assets/**/*"
];
