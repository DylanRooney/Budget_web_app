const router = require("express").Router();
const { SubCategory, Expense } = require('../models');


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
        res.render("profile", { loggedIn: req.session.loggedIn });
    } catch {
        res.status(500).json(err);
    }
});

router.get("/expense", async (req, res) => {
    try {
        const expenseData = await Expense.findAll({
            where: {
                user_id: req.session.user_id,
            }
        }).catch((err) => {
            res.json(err);
        })
        const expenses = expenseData.map((expense_name) => expense_name.get({ plain: true }));
        console.log(expenses);
        res.render("expense", { expenses, loggedIn: req.session.loggedIn });
    } catch {
        res.status(500).json(err);
    }
});

router.get("/add", async (req, res) => {
    try {
        const subCategoryData = await SubCategory.findAll().catch((err) => {
            res.json(err);
        })
        const subcategories = subCategoryData.map((subcategory) => subcategory.get({ plain: true }));
        console.log(subcategories)
        res.render("add", { subcategories, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;