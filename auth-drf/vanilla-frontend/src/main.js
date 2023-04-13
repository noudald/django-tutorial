/* Main javascript file. */

// Router class that manages all pages.
class Router {
  constructor(pages) {
    // Do nothing (yet).
  }

  navigate(path) {
    var pages = {
      'login': {
        'urlContainer': '/container/login.html',
        'title': 'Login page',
        'urlIndex': 'login',
        'jsFiles': ['/src/login.js'],
      }
    };

    const elementHTMLContainer = 'mainContainer';

    if (path in pages) {
      const page = pages[path];

      fetch(page.urlContainer)
        .then((response) => response.text())
        .then((body) => {
          const container = document.getElementById(elementHTMLContainer);

          container.innerHTML = body;

          if ('jsFiles' in page) {
            page.jsFiles.forEach((file) => {
              var jsScript = document.createElement('script');
              jsScript.type = 'text/javascript';
              jsScript.src = file;
              container.appendChild(jsScript);
            });
          }

          if ('cssFiles' in page) {
            page.cssFiles.forEach((file) => {
              const cssLink = document.createElement('link');
              cssLink.rel = 'stylesheet';
              cssLink.href = file;
              container.appendChild(cssLink);
            });
          }

          window.history.pushState({path}, page.title, 'index.html' + window.location.search + '#' + page.urlIndex);
        })
        .catch((error) => console.log("Error", error));
    } else {
      console.log(`Error loading path ${path}`);
    }
  }
}


const router = new Router({});

router.navigate('login');
