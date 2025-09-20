// lib/sequelize.js
import { Sequelize } from "sequelize";
import mysql2 from "mysql2"; // explicitly import mysql2

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database username
  process.env.DB_PASS,       // Database password
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    dialectModule: mysql2,   // ensure mysql2 is used
    logging: false,          // turn off SQL logging (set to true if needed)
  }
);

// Test connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error);
  }
};

export default sequelize;