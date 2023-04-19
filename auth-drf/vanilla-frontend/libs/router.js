/* Router class that manages all pages. */

export class Router {
  constructor(pages, config) {
    this.pages = pages;
    this.rootURL = config['rootURL'];
    this.elementHTMLContainer = config['elementHTMLContainer'];
    this.authenticator = config.authenticator;

    window.addEventListener('hashchange', () => {
      console.log('Hash changed', window.location.hash);
      this.navigate(window.location.hash.substring(1));
    });
  }

  navigate(pageName) {
    if (pageName in this.pages) {
      const page = this.pages[pageName];

      if (page.needAuthentication && !this.authenticator.amIAuthenticated()) {
        const container = document.querySelector(`#${this.elementHTMLContainer}`);
        container.innerHTML = '<p>Needs authentication to watch this page!</p>';
        return false;
      }

      fetch(page.urlContainer)
        .then((response) => response.text())
        .then((body) => {
          const container = document.querySelector(`#${this.elementHTMLContainer}`);
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

          if ('moduleFiles' in page) {
            page.moduleFiles.forEach((file) => {
              const moduleScript = document.createElement('script');
              moduleScript.type = 'module';
              moduleScript.src = file;
              container.appendChild(moduleScript);
            });
          }
        })
        .catch((error) => console.log("Error", error));
    } else {
      console.log(`Error loading page ${pageName}`);
    }
  }
}
