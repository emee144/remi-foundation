import { Sequelize, DataTypes } from "sequelize";
import mysql2 from "mysql2"; // explicitly import mysql2

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    dialectModule: mysql2, // explicitly use mysql2
    logging: false,
  }
);

// Define User model
export const User = sequelize.define(
  "users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nin: { type: DataTypes.STRING, unique: true, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    otherNames: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    lga: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.ENUM("male", "female"), allowNull: false },
    ageRange: { type: DataTypes.STRING, allowNull: false },
    occupation: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    profilePicture: { type: DataTypes.BLOB("long"), allowNull: true },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

export default sequelize;
