module.exports = function() {
  let data = {
    name: 'It Really Do Be Like That',
    author: 'Joe Joiner',
    env: process.env.ELEVENTY_ENV
  }

  const isDev = data.env === 'development'
  data.root = isDev ? 'http://localhost:8080/' : 'https://itreallydobeliketh.at/'

  return data;
}
