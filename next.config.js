/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // Important: return the modified config
    if (!isServer) {
      // config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
      config.plugins.push(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de/)
      );
      // config.plugins.push(new DuplicatePackageCheckerPlugin());
      // config.resolve.alias["fast-deep-equal"] = path.resolve(
      //   __dirname,
      //   "node_modules",
      //   "fast-deep-equal"
      // );
      config.resolve.extensions = [".mjs", ".js", ".jsx", ".json"];
    }
    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({ reactStrictMode: true });
