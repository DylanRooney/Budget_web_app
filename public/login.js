async function handleLogin(event) {
    event.preventDefault();
    console.log('function triggered')

    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
    console.log(username)
    console.log(password)

    if (username && password) {
        const response = await fetch('/user/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);