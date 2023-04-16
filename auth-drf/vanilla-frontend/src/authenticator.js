/* Authenticator class for dealing with authentication. */

export class Authenticator {
  constructor() {
    this.isAuthenticated = false;
    this.token = '';
    this.expiry = '';
  }

  amIAuthenticated() {
    if (!this.isAuthenticated) {
      return false;
    }

    if (this.isTokenExpired()) {
      this.isAuthenticated = false;
      return false;
    }

    return true;
  }

  isTokenExpired() {
    if (this.expiry === '' || this.token === '') {
      return ;
    }

    const expiryDate = new Date(Date.parse(this.expiry));
    const nowDate = new Date();
    if (expiryDate < nowDate) {
      return true;
    } else {
      return false;
    }
  }

  async whoAmI() {
    return fetch('http://localhost:8000/api/auth/whoami/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error('Could not figure out who I am');
        }
      })
      .then((data) => {
        return {
          'status': true,
          'message': 'Succesfully figured out who I am',
          'username': data.username,
          'email': data.email,
        };
      })
      .catch((error) => {
        return {
          'status': false,
          'message': 'Could not figure out who I am',
        };
      });
  }

  async logIn(username, password) {
    return fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error('Could not log in with provided credentials')
        }})
      .then((data) => {
        this.isAuthenticated = true;
        this.token = data.token;
        this.expiry = data.expiry;

        sessionStorage.setItem('isAuthenticated', this.isAuthenticated);
        sessionStorage.setItem('token', this.token);
        sessionStorage.setItem('expiry', this.expiry);

        return {
          'status': true,
          'message': 'Succesfully logged in.'
        };
      })
      .catch((err) => {
        return {
          'status': false,
          'message': err,
        };
      });
  }

  logOut() {

  }
}
