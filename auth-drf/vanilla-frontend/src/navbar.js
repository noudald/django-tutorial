/* Navigation bar */

export class NavBar {
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
