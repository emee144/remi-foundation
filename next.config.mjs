import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Keep your existing alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd(), "src"),
    };

    // Optional: suppress Sequelize warnings
    config.module.exprContextCritical = false;

    // 🔹 Add this: ignore Node modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,  // optional
        os: false,    // optional
      };
    }

    return config;
  },
};

export default nextConfig;
