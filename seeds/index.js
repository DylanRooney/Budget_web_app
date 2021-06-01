const sequelize = require('../config/connection');
const seedParentCategory = require('./parentCategoryData');
const seedSubCategory = require('./subCategoryData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedParentCategory();
    await seedSubCategory();

    process.exit(0);
};

seedAll();