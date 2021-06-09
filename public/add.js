async function handleAddExpense(event) {
    event.preventDefault();
    console.log('function triggered')

    const expense_name = document.getElementById('expense_name').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const subcategory_id = document.getElementById("subcategory").value;
    console.log(expense_name)
    console.log(amount)
    console.log(subcategory_id)

    if (expense_name && amount && subcategory_id) {
        const response = await fetch('/purchase/expense', {
            method: 'POST',
            body: JSON.stringify({
                expense_name,
                amount,
                subcategory_id,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/expense');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.add-form').addEventListener('submit', handleAddExpense);