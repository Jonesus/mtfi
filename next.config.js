const withTM = require('next-transpile-modules')(['@directus/sdk-js']);

module.exports = withTM({
  images: {
    domains: ['localhost'],
  },
});
