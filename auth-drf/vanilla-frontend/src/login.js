/* Login Javascript template */

document
  .getElementById('formLogin')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Prevent doing anything');

    const username = document.querySelector('#inputUsername');
    const password = document.querySelector('#inputPassword');

    globalVars.authenticator
      .logIn(username.value.trim(), password.value.trim())
      .then((result) => {
        if (result.status) {
          window.location.hash = '#helloworld';
        }
        globalVars.authenticator.whoAmI()
          .then((result) => console.log(result));
      });


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
