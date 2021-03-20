module.exports = function() {
  let data = {
    name: 'It Really Do Be Like That',
    author: 'Joe Joiner',
    env: process.env.ELEVENTY_ENV
  }

  if (data.env === 'development') {
    data.root = 'http://localhost:8080'
  } else {
    data.root = 'https://itreallydobeliketh.at'
  };

  return data
};
