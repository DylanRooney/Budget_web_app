const router = require('express').Router();
const { Expense } = require('../models');

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
router.post('/expense', async (req, res) => {
    console.log('request received')
    console.log(req.body.expense_name)
    try {
        const newexpense = await Expense.create({
            //do i need id?
            expense_name: req.body.expense_name,
            amount: req.body.amount,
            sub_category_id: req.body.sub_category_id,
            user_id: req.body.user_id

        })
        res.status(200).json(newexpense)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})





module.exports = router