const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Expense extends Model {}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      ALLOWNULL: false,
      PRIMARYKEY: true,
      AUTOINCREMENT: true,
    },
    expense_name: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      ALLOWNULL: false,
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      ALLOWNULL: false,
      REFERNCES: {
        MODEL: "subCategory",
        KEY: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      ALLOWNULL: false,
      REFERENCES: {
        MODEL: "user",
        KEY: "id",
      },
    },
  },
  {
    sequelize,
    // timestamps: false,
    FREEZETABLEFRAME: true,
    UNDERSCORED: true,
    MODELNAME: "expense",
  }
);

module.exports = Expense;
