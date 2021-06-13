const ParentCategory = require("./parentCategory");
const SubCategory = require("./subCategory");
const Expense = require("./expense");
const User = require("./user");

ParentCategory.hasMany(SubCategory, {
  FOREIGNKEY: "parent_category_id",
});

SubCategory.belongsTo(ParentCategory, {
  FOREIGNKEY: "parent_category_id",
});

SubCategory.hasMany(Expense, {
  FOREIGNKEY: "sub_category_id",
});

Expense.belongsTo(SubCategory, {
  FOREIGNKEY: "sub_category_id",
});

User.hasMany(Expense, {
  FOREIGNKEY: "user_id",
});

Expense.belongsTo(User, {
  FOREIGNKEY: "user_id",
});

module.exports = { ParentCategory, SubCategory, Expense, User };
