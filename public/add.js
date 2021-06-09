async function handleAddExpense(event) {
    event.preventDefault();
    console.log('function triggered')

    const expense_name = document.getElementById('expense_name').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const subcategory_id = document.getElementById("subcategory").value;
    const errorsEl = document.getElementById('errors');

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
            const body = await response.json();
            const errors = body.errors
            console.log(errors)
            errorsEl.innerHTML = "";
            let ul = document.createElement('ul');
            let li = document.createElement('li');
            li.innerHTML = `${errors[0].msg}`;
            ul.appendChild(li);
            errorsEl.appendChild(ul);
        }
    }
}

document.querySelector('.add-form').addEventListener('submit', handleAddExpense);