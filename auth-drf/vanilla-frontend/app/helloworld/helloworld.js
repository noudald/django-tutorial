globalVars.authenticator.whoAmI()
  .then((data) => {
    if (data.status) {
      document.querySelector('#welcomeMessage').innerHTML = `Welcome back, ${data.username}.`;
    }
  });
