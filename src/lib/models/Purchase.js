import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../sequelize"; // your sequelize instance
import { User } from "./User";

export const Purchase = sequelize.define(
  "purchases",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,      // reference User model
        key: "id",        // column in User table
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

// Setup association
User.hasMany(Purchase, { foreignKey: "userId" });
Purchase.belongsTo(User, { foreignKey: "userId" });