const router = require("express").Router();
const { SubCategory, Expense, ParentCategory, User } = require('../models');


router.get("/", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.render("profile", { loggedIn: req.session.loggedIn });
        } else {
            res.render("login", { loggedIn: req.session.loggedIn });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/signup", async (req, res) => {
    try {
        res.render("signup");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/profile", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const userData = await User.findOne({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password']
                }
            })
            const user = userData.get({ plain: true });
            console.log(user)
            res.render("profile", { user, loggedIn: req.session.loggedIn });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/expense", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const expenseData = await Expense.findAll({
                where: {
                    user_id: req.session.user_id,
                },
                include: [
                    {
                        model: SubCategory,
                        attributes: ['id', 'subcategory_name', 'parent_category_id'],
                        include: {
                            model: ParentCategory,
                            attributes: ['id', 'category_name']
                        }
                    }
                ],
            })
            const userData = await User.findOne({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password']
                }
            })
            const user = userData.get({ plain: true });
            console.log(user)
            console.log(expenseData)
            const expenses = expenseData.map((expense_name) => expense_name.get({ plain: true }));
            let hasExpenses
            res.render("expense", { user, expenses, loggedIn: req.session.loggedIn });
            return;
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/add", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const subCategoryData = await SubCategory.findAll().catch((err) => {
                res.json(err);
            })
            const subcategories = subCategoryData.map((subcategory) => subcategory.get({ plain: true }));
            console.log(subcategories)
            res.render("add", { subcategories, loggedIn: req.session.loggedIn });
            return;
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;