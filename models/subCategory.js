const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SubCategory extends Model {}

SubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      ALLOWNULL: false,
      PRIMARYKEY: true,
      AUTOINCREMENT: true,
    },
    subcategory_name: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
    },
    parent_category_id: {
      type: DataTypes.INTEGER,
      ALLOWNULL: false,
      REFERENCES: {
        MODEL: "parentCategory",
        KEY: "id",
      },
    },
  },
  {
    sequelize,
    TIMESTAMPS: false,
    FREEZETABLENAME: true,
    UNDERSCORED: true,
    MODELNAME: "subCategory",
  }
);

module.exports = SubCategory;
