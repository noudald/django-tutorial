/* Main javascript file. */

import { Router } from './router.js';

// Example how to get current values from url.
const hashValue = window.location.hash.substring(1);
const searchValue = window.location.search;
const searchParams = new URLSearchParams(searchValue);

console.log(hashValue);
console.log(searchParams);


const routerPages = {
  login: {
    title: 'Login page',
    urlIndex: 'login',
    urlContainer: '/container/login.html',
    jsFiles: ['/src/login.js'],
  },
  helloworld: {
    title: 'Hello World!',
    urlIndex: 'helloworld',
    urlContainer: '/container/helloworld.html',
  },
};

const routerConfig = {
  rootURL: 'index.html',
  elementHTMLContainer: 'mainContainer',
};

const router = new Router(routerPages, routerConfig);

router.navigate('login');
