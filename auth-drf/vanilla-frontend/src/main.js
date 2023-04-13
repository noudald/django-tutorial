/* Main javascript file. */

// Router class that manages all pages.
class Router {
  constructor(pages, config) {
    this.pages = pages;
    this.rootURL = config['rootURL'];
    this.elementHTMLContainer = config['elementHTMLContainer'];
  }

  navigate(pageName) {
    if (pageName in this.pages) {
      const page = this.pages[pageName];

      fetch(page.urlContainer)
        .then((response) => response.text())
        .then((body) => {
          const container = document.getElementById(this.elementHTMLContainer);
          container.innerHTML = body;

          if ('jsFiles' in page) {
            page.jsFiles.forEach((file) => {
              const jsScript = document.createElement('script');
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

          window.history.pushState(
            {pageName},
            page.title,
            this.rootURL + window.location.search + '#' + page.urlIndex
          );
        })
        .catch((error) => console.log("Error", error));
    } else {
      console.log(`Error loading page ${pageName}`);
    }
  }
}

// Example how to get current values from url.
const hashValue = window.location.hash.substring(1);
const searchValue = window.location.search;
const searchParams = new URLSearchParams(searchValue);

console.log(hashValue);
console.log(searchParams);

window.addEventListener('hashchange', () => {
  console.log('Hash changed', window.location.hash);
});


const router = new Router(
  {
    login: {
      title: 'Login page',
      urlIndex: 'login',
      urlContainer: '/container/login.html',
      jsFiles: ['/src/login.js'],
    },
  },
  {
    rootURL: 'index.html',
    elementHTMLContainer: 'mainContainer',
  }
);

router.navigate('login');
