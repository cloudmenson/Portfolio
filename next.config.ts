import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["app", "pages", "components", "src"],
  },

  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /react/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            svgo: true,
            svgoConfig: {
              plugins: [{ name: "removeViewBox", active: false }],
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset",
      resourceQuery: { not: [/react/] },
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

export default nextConfig;
