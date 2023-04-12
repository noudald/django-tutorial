/* Main javascript file. */

fetch('/helloworld.html')
  .then((response) => response.text())
  .then((body) => document.querySelector('#mainContainer').innerHTML = body)
  .catch((error) => console.log(error));


class Router {
  constructor(pages) {
    // Do nothing.
  }

  navigate(path) {
    console.log(path);

    if (path === 'home') {
      window.history.pushState({path}, 'Home page', 'index.html#home');
    } else if (path == 'test') {
      window.history.pushState({path}, 'Test page', 'index.html#test');
    }
  }
}

const router = new Router({});
