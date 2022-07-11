const fs = require('fs');
const path = require('path');
const withLess = require('next-with-less');
const lessToJS = require('less-vars-to-js');
const { redirect } = require('next/dist/server/api-utils');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/variables.less'), 'utf8')
);

module.exports = {
  ...withLess({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
        localIdentName: '[path]___[local]___[hash:base64:5]',
      },
    },
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false,
        crypto: false,
        path: false,
        util: false,
        events: false,
        querystring: false,
      };

      return config;
    },
  }),
  images: {
    domains: ['live.staticflickr.com', 's3.us-west-2.amazonaws.com'],
  },
};
