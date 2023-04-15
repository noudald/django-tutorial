/* Login Javascript template */

document
  .getElementById('formLogin')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Prevent doing anything');

    const username = document.querySelector('#inputUsername');
    const password = document.querySelector('#inputPassword');

    fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error('Could not log in with provided credentials.');
        }
      })
      .then((data) => {
        console.log('Logged in!', data);

        globalVars.isAuthenticated = true;
        globalVars['token'] = data.token;
        globalVars['expiry'] = data.expiry;

        window.location.hash = '#helloworld';
      })
      .catch((error) => console.log('Error', error));

    username.value = '';
    password.value = '';

  });

document
  .getElementById('inputLogin')
  .addEventListener('click', () => {
    console.log('click')
  });

console.log('Login script ran');
console.log('login', globalVars);
