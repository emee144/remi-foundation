import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd(), "src"), // '@' → 'src'
    };

    // Optional: suppress Sequelize warnings
    config.module.exprContextCritical = false;

    return config;
  },
};

export default nextConfig;
