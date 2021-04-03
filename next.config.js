const withTM = require('next-transpile-modules')(['@directus/sdk-js']);

module.exports = withTM({
  images: {
    domains: ['localhost', 'mtfi-cms'],
    deviceSizes: [200, 300, 400, 450, 600, 900, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [200, 300, 400, 450, 600, 900],
  },
});
