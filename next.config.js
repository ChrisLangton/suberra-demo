const withTM = require("next-transpile-modules")([
  "@suberra/react-commons",
  "@suberra/evm-sdk",
]);
const { withPlausibleProxy } = require("next-plausible");

const plausibleExports = withPlausibleProxy()({
  images: {
    domains: [
      "assets.terra.money",
      "xdefi-prod-common-ui.s3.eu-west-1.amazonaws.com",
      "leapwallet.io",
      "api.falconwallet.app",
    ],
  },
  swcMinify: true,
});

module.exports = withTM(plausibleExports);
