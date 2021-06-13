const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ParentCategory extends Model {}

ParentCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    Underscored: true,
    modelName: "parentCategory",
  }
);

module.exports = ParentCategory;
