/* Main javascript file. */

import { Router } from './router.js';


// Example how to get current values from url.
const hashValue = window.location.hash.substring(1);
const searchValue = window.location.search;
const searchParams = new URLSearchParams(searchValue);

console.log(hashValue);
console.log(searchParams);


class NavBar {
	constructor(pages, config) {
		this.pages = pages;
		this.elementHTMLNavBar = config['elementHTMLNavBar'];

		this.renderNavBar();
	}

	renderNavBar() {
    const navBarElement = document.querySelector(`.${this.elementHTMLNavBar}`);
    const navBarList = document.createElement('ul');

		Object.keys(this.pages).forEach((page) => {
      const navBarItem = document.createElement('li');
      const navBarLink = document.createElement('a');

      navBarLink.href = `#${page}`;
      navBarLink.text = this.pages[page].title;

      navBarItem.appendChild(navBarLink);
      navBarList.appendChild(navBarItem);
		});

    navBarElement.appendChild(navBarList);
	}
}


const routerPages = {
  login: {
    title: 'Login page',
    urlContainer: '/container/login.html',
    jsFiles: ['/src/login.js'],
  },
  helloworld: {
    title: 'Hello World!',
    urlContainer: '/container/helloworld.html',
  },
};

const routerConfig = {
  rootURL: 'index.html',
  elementHTMLContainer: 'mainContainer',
};

const router = new Router(routerPages, routerConfig);

router.navigate('login');


const navBar = new NavBar(routerPages, { elementHTMLNavBar: 'navbar' });

console.log('main', globalVars);
globalVars['testVariable'] = 'Changed variable in main';
