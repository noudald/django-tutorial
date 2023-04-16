/* Main javascript file. */

import { Router } from './router.js';
import { NavBar } from './navbar.js';
import { Authenticator } from './authenticator.js';


const routerPages = {
  login: {
    title: 'Login page',
    urlContainer: '/container/login.html',
    jsFiles: ['/src/login.js'],
    needAuthentication: false,
  },
  helloworld: {
    title: 'Hello World!',
    urlContainer: '/container/helloworld.html',
    needAuthentication: true,
  },
};

const routerConfig = {
  rootURL: 'index.html',
  elementHTMLContainer: 'mainContainer',
};

const router = new Router(routerPages, routerConfig);
globalVars['router'] = router;
sessionStorage.setItem('router', router);
sessionStorage.setItem('isAuthenticated', false);


const navBar = new NavBar(routerPages, { elementHTMLNavBar: 'navbar' });


const hashValue = window.location.hash.substring(1);
router.navigate(hashValue);


const authenticator = new Authenticator();
globalVars['authenticator'] = authenticator;
