/* Navigation bar */

export class NavBar {
	constructor(pages, config) {
		this.elementHTMLNavBar = config['elementHTMLNavBar'];

    this.pages = {};
    for (const [pageHash, page] of Object.entries(pages)) {
      this.addPage(pageHash, page);
    }

		this.renderNavBar();
	}

  addPage(pageHash, page) {
    if (!('title' in page)) {
      throw new Error('Page should contain title');
    }

    this.pages[pageHash] = page;
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
