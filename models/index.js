const ParentCategory = require('./parentCategory');
const SubCategory = require('./subCategory');

ParentCategory.hasMany(SubCategory, {
    foreignKey: 'parent_category_id',
});

SubCategory.belongsTo(ParentCategory, {
    foreignKey: 'parent_category_id',
});

module.exports = { ParentCategory, SubCategory };