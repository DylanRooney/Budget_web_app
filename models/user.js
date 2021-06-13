const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      ALLOWNULL: false,
      PRIMARYKEY: true,
      AUTOINCREMENT: true,
    },
    username: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
    },
    email: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
      UNIQUE: true,
      VALIDATE: {
        ISEMAIL: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      ALLOWNULL: false,
      VALIDATE: {
        LEN: [8],
      },
    },
  },
  {
    HOOKS: {
      async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },
    },
    sequelize,
    TIMESTAMPS: false,
    FREEZETABLENAME: true,
    UNDERSCORE: true,
    MODELNAME: "user",
  }
);

module.exports = User;
