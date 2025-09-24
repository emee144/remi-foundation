import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "./User"; // import named sequelize instance
import { User } from "./User";

// Define Purchase model
export const Purchase = sequelize.define(
  "purchases",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
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

// Setup associations
User.hasMany(Purchase, { foreignKey: "userId", as: "purchases" });
Purchase.belongsTo(User, { foreignKey: "userId" });
