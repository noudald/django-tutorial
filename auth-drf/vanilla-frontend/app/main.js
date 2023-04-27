/* Main javascript file. */

import { Router } from '/libs/router.js';
import { NavBar } from '/libs/navbar.js';
import { Authenticator } from '/libs/authenticator.js';


const authenticator = new Authenticator();
globalVars['authenticator'] = authenticator;


const routerPages = {
  login: {
    title: 'Login page',
    urlContainer: '/app/login/login.html',
    jsFiles: ['/app/login/login.js'],
    needAuthentication: false,
  },
  helloworld: {
    title: 'Hello World!',
    urlContainer: '/app/helloworld/helloworld.html',
    jsFiles: ['/app/helloworld/helloworld.js'],
    needAuthentication: true,
  },
  table: {
    title: 'Dynamic Table',
    urlContainer: '/app/table/table.html',
    jsFiles: ['/app/table/table.js'],
    cssFiles: ['/libs/modal.css'],
    needAuthentication: false,
  },
  lorumipsum: {
    title: 'Lorum Ipsum',
    urlContainer: '/app/lorum/ipsum.html',
    needAuthentication: true,
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
if (hashValue == '') {
  router.navigate('helloworld');
} else {
  router.navigate(hashValue);
}


