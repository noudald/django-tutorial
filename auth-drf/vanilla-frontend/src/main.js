/* Main javascript file. */

import { Router } from './router.js';
import { NavBar } from './navbar.js';
import { Authenticator } from './authenticator.js';


const authenticator = new Authenticator();
globalVars['authenticator'] = authenticator;


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
    jsFiles: ['/src/helloworld.js'],
    needAuthentication: true,
  },
  table: {
    title: 'Dynamic Table',
    urlContainer: '/container/table.html',
    jsFiles: ['/src/table.js'],
    needAuthentication: false,
  }
};

const routerConfig = {
  rootURL: 'index.html',
  elementHTMLContainer: 'mainContainer',
  authenticator: authenticator,
};

const router = new Router(routerPages, routerConfig);
globalVars['router'] = router;


const navBar = new NavBar(routerPages, { elementHTMLNavBar: 'navbar' });


const hashValue = window.location.hash.substring(1);
router.navigate(hashValue);


