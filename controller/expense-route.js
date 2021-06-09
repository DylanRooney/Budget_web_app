const router = require('express').Router();
const { Expense } = require('../models');
const { check, validationResult } = require('express-validator');

router.get('/expense/:id', async (req, res) => {
    const string = req.params.id
    console.log(req.params.id)
    console.log(parseInt(string))
    try {
        const expensedata = await Expense.findAll({
            where: {
                user_id: parseInt(string)
            }
        })
        res.status(200).json(expensedata)
        //maybe write logic to turn into array then use client side logic to put onto page
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)
router.post('/expense',
    check('amount').isNumeric().withMessage('Amount can only contain numbers'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newexpense = await Expense.create({
                expense_name: req.body.expense_name,
                amount: req.body.amount,
                sub_category_id: req.body.subcategory_id,
                user_id: req.session.user_id
            })
            res.status(200).json(newexpense)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    })


router.delete('/expense/:id', async (req, res) => {
    try {
        const expensedata = await Expense.destroy({
            where: {
                id: req.params.id,
                //might need user_id
            }
        })
        if (!expensedata) {
            res.status(404).json({ message: "no expense with this id" });
            return;
        }
        res.status(200).json(expensedata)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router
