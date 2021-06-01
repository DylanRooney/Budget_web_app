const ParentCategory = require('./parentCategory');
const SubCategory = require('./subCategory');
const User = require('./user');

ParentCategory.hasMany(SubCategory, {
    foreignKey: 'parent_category_id',
});

SubCategory.belongsTo(ParentCategory, {
    foreignKey: 'parent_category_id',
});

module.exports = { ParentCategory, SubCategory, User };