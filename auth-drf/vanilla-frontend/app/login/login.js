/* Login Javascript template */

if (globalVars.authenticator.amIAuthenticated()) {
  globalVars.authenticator.whoAmI()
    .then((data) => {
      const welcomeMessageElement = document.querySelector('#welcomeMessage');
      if (data.status) {
        welcomeMessageElement.innerHTML = `Welcome ${data.username}!`;
      } else {
        welcomeMessageElement.innerHTML = 'Welcome, unfortunately I could not figure out who you are.';
      }
    });

  document.querySelector('#formLogin').style.display = 'none';
  document.querySelector('#formLogout').style.display = 'block';
} else {
  document.querySelector('#formLogin').style.display = 'block';
  document.querySelector('#formLogout').style.display = 'none';
}


document
  .getElementById('formLogin')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Prevent doing anything');

    const loginErrorMessageElement = document.querySelector('#loginErrorMessage');

    const username = document.querySelector('#inputUsername');
    const password = document.querySelector('#inputPassword');

    globalVars.authenticator
      .logIn(username.value.trim(), password.value.trim())
      .then((result) => {
        if (result.status) {
          window.location.hash = '#helloworld';
          loginErrorMessage.innerHTML = 'Could not login';
          globalVars.authenticator.whoAmI()
            .then((result) => console.log(result));
        } else {
          loginErrorMessageElement.innerHTML = 'Could not login';
        }
      });


    username.value = '';
    password.value = '';
  });

document
  .getElementById('inputLogin')
  .addEventListener('click', () => {
    console.log('click')
  });

document
  .querySelector('#formLogout')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    globalVars.authenticator
      .logOut()
      .then((result) => {
        if (result.status) {
          window.location.reload();
        } else {
          throw new Error('Could not logout');
        }
      })
      .catch((error) => alert('Could not logout user.'));
  });

console.log('Login script ran');
console.log('login', globalVars);
