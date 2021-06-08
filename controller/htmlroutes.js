const router = require("express").Router();
const { SubCategory } = require('../models');


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
        res.render("expense", { loggedIn: req.session.loggedIn });
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