const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ParentCategory extends Model {}

ParentCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      PRIMARYKEY: true,
      ALLOWNULL: false,
      AUTOINCREMENT: true,
    },
    category_name: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
    },
  },
  {
    sequelize,
    TIMESTAMPS: false,
    FREEZETABLENAME: true,
    UNDERSCORED: true,
    MODELNAME: "parentCategory",
  }
);

module.exports = ParentCategory;
