/* Main javascript file. */

import { Router } from './router.js';
import { NavBar } from './navbar.js';


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
globalVars['router'] = router;


const navBar = new NavBar(routerPages, { elementHTMLNavBar: 'navbar' });


const hashValue = window.location.hash.substring(1);
router.navigate(hashValue);

