const router = require('express').Router();
const { Expense } = require('../models');

router.get('/expense/:id', async (req, res) => {
    try {
        const expensedata = Expense.findAll({ where: user_id = req.params.id })
        res.status(204).json(expensedata)
        //maybe write logic to turn into array then use client side logic to put onto page
    } catch (err) {
        res.status(500).json(err)

    }
}
)
router.post('/expense', async (req, res) => {
    try {
        const newexpense = Expense.create({
            //do i need id?
            expense_name: req.body.expense_name,
            amount: req.body, amount,
            sub_category_id: req.body.sub_category_id,

        })
        res.status(204).json(newexpense)
    } catch (err) {
        res.status(500).json(err)
    }

})





module.exports = router