async function handleSignup(event) {
    event.preventDefault();
    console.log('function triggered')

    const username = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    const errorsEl = document.getElementById('errors');
    const usernameEl = document.getElementById('username-label');
    const emailEl = document.getElementById('email-label');
    const passwordEl = document.getElementById('password-label')

    if (username && email && password) {
        const response = await fetch('/user/signup', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            const body = await response.json();
            errorsEl.innerHTML = ""
            let ul = document.createElement('ul');
            body.errors.forEach((e) => {
                let li = document.createElement('li');
                li.innerHTML = `${e.msg}`
                ul.appendChild(li);

                if (e.param === 'username') {
                    usernameEl.style.color = "red";
                } if (e.param === 'email') {
                    emailEl.style.color = "red";
                } else if (e.param === 'password') {
                    passwordEl.style.color = "red";
                }
            })
            errorsEl.appendChild(ul);
        }
    }
}

document.getElementById('signup-form').addEventListener('submit', handleSignup);