const path = require("path");
const Sequelize = require("sequelize");
const mysql = require("mysql");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "qao3ibsa7hhgecbv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
