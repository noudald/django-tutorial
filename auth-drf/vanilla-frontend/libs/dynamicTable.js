export class DynamicTable {
  constructor({ columns, rows, divClass = null }) {
    this.columns = columns;
    this.rows = rows;
    this.divClass = divClass;

    this.colSize = this.columns.length;
    this.rowSize = this.rows.length;

    this.index = [...Array(this.rowSize).keys()];
    for (var i = 0; i < this.rowSize; i++) {
      this.rows[i]['Index'] = i;
    }

    this.sortColumnDirection = [null, null];
    this.filterMask = Array.from({length: this.rowSize}, _ => true);
  }

  equals(obj) {
    if (typeof obj != typeof this) {
      return false;
    }

    if (this.columns.length != obj.columns.length) {
      return false;
    } else {
      for (var i = 0; i < this.columns.length; i++) {
        if (this.columns[i] != obj.columns[i]) {
          return false;
        }
      }
    }

    if (this.rows.length != obj.rows.length) {
      return false;
    } else {
      for (var i = 0; i < this.rows.length; i++) {
        this.columns.forEach((col) => {
          if (this.rows[i][col] != obj.rows[i][col]) {
            return false;
          }
        });
      }
    }

    return true;
  }

  static fromJSON(json) {
    return new DynamicTable(json);
  }

  filter(filterRule) {
    this.filterMask = this.rows.map(filterRule);
  }

  #constructSearchBar(divClass) {
    const tableDiv = document.querySelector(`.${divClass}`);

    const label = document.createElement('label');
    label.for = 'searchBar';
    label.innerHTML = 'Search:';

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.id = 'searchBar';
    searchBar.name = 'searchBar';
    searchBar.size = '10';

    tableDiv.appendChild(label);
    tableDiv.appendChild(searchBar);

    searchBar.addEventListener('input', () => {
      const searchBarValue = searchBar.value;
      this.filter((row) => {
        for (let [key, value] of Object.entries(row)) {
          if (String(value).includes(searchBarValue)) {
            return true;
          }
        }
        return false;
      });
      this.#constructTable('table');
    });
  }

  #constructTable(divClass=this.divClass, rows=this.rows) {
    if (this.divClass == null) {
      this.divClass = divClass;
    }

    const tableDiv = document.querySelector(`.${divClass}`);
    let tableElm = tableDiv.querySelector(`#${divClass}Table`);
    if (tableElm) {
      tableElm.innerHTML = '';
    } else {
      tableElm = document.createElement('table');
      tableElm.id = `${divClass}Table`;
      tableDiv.appendChild(tableElm);
    }

    const tableTr = document.createElement('tr');
    const tableTh = document.createElement('th');

    tableTh.innerHTML = 'Index';
    tableTh.id = 'Index';
    tableTr.appendChild(tableTh);

    this.columns.forEach((column) => {
      const tableTh = document.createElement('th');

      tableTh.innerHTML = column;
      tableTh.id = column;
      if (this.sortColumnDirection[0] == column) {
        tableTh.innerHTML += ` (${this.sortColumnDirection[1]})`;
      }
      tableTr.appendChild(tableTh);
    });

    tableElm.appendChild(tableTr);

    this.index.forEach((i) => {
      if (!this.filterMask[i]) {
        return;
      }

      const row = rows[i];

      const tableTr = document.createElement('tr');

      const tableTd = document.createElement('td');
      tableTd.innerHTML = row['Index'];
      tableTr.appendChild(tableTd);

      this.columns.forEach((col) => {
        const tableTd = document.createElement('td');
        tableTd.innerHTML = row[col];
        tableTd.contentEditable = 'true';
        tableTr.appendChild(tableTd);
      });

      tableElm.appendChild(tableTr);
    });

    tableElm.querySelectorAll('th').forEach((th) => {
      th.addEventListener('click', () => {
        // TODO: Create a better sorting algorithm in seperate function.
        const sortColumn = th.id;
        const newRows = Array.from(rows);

        if (this.sortColumnDirection[0] == sortColumn) {
          if (this.sortColumnDirection[1] == 'asc') {
            newRows.sort((ra, rb) => {
              if (ra[sortColumn] < rb[sortColumn]) {
                return 1;
              } else if (ra[sortColumn] > rb[sortColumn]) {
                return -1;
              } else {
                return 0;
              }
            });
            if (sortColumn == 'Index') {
              this.sortColumnDirection = [null, null];
            } else {
              this.sortColumnDirection = [sortColumn, 'desc'];
            }
          } else if (this.sortColumnDirection[1] == 'desc') {
            newRows.sort((ra, rb) => {
              if (ra['Index'] < rb['Index']) {
                return -1;
              } else if (ra['Index'] > rb['Index']) {
                return 1;
              }
            });
            this.sortColumnDirection = [null, null];
          }
        } else {
          newRows.sort((ra, rb) => {
            if (ra[sortColumn] < rb[sortColumn]) {
              return -1;
            } else if (ra[sortColumn] > rb[sortColumn]) {
              return 1;
            } else {
              return 0;
            }
          });
          this.sortColumnDirection = [sortColumn, 'asc'];
        }

        this.#constructTable(divClass, newRows);
      });
    });

    tableElm.querySelectorAll('td').forEach((td) => {
      td.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
          e.preventDefault();

          const currentTr = td.parentNode;
          const currentColumnIndex = Array.from(currentTr.children).indexOf(td);
          const nextTr = currentTr.nextElementSibling;
          if (nextTr) {
            td.blur()
            const nextTd = nextTr.children[currentColumnIndex];
            nextTd.focus();
          }
        } else if (e.key === 'ArrowUp') {
          const currentTr = td.parentNode;
          const currentColumnIndex = Array.from(currentTr.children).indexOf(td);
          const previousTr = currentTr.previousElementSibling;
          if (previousTr.previousElementSibling) {
            td.blur();
            const previousTd = previousTr.children[currentColumnIndex];
            previousTd.focus();
          }
        } else if (e.key == 'ArrowLeft') {
          const selection = window.getSelection();
          const anchorOffset = selection.anchorOffset;

          if (anchorOffset == 0) {
            const previousTd = td.previousElementSibling;

            // Check if we're not next to uneditable Index column.
            if (previousTd && previousTd.previousElementSibling) {
              td.blur();
              previousTd.focus();

              const range = document.createRange();
              const textLength = selection.anchorNode.length;
              range.setStart(previousTd.lastChild, textLength);
              range.setEndAfter(previousTd.lastChild, textLength);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        } else if (e.key == 'ArrowRight') {
          const selection = window.getSelection();
          const anchorOffset = selection.anchorOffset;
          const textLength = selection.anchorNode.length;

          if (anchorOffset == textLength) {
            const nextTd = td.nextElementSibling;
            if (nextTd) {
              td.blur();
              nextTd.focus();

              const range = document.createRange();
              range.setStartBefore(nextTd.lastChild, 0);
              range.setEnd(nextTd.lastChild, 0);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }
      });

      td.addEventListener('focusout', (e) => {
        const currentTr = td.parentNode;
        const currentIndex = parseInt(currentTr.childNodes[0].innerHTML);
        const currentColumnIndex = Array.from(currentTr.children).indexOf(td);
        const currentColumn = this.columns[currentColumnIndex - 1];

        this.rows[currentIndex][currentColumn] = td.innerHTML;
      });
    });
  }

  construct(divClass) {
    this.#constructSearchBar(divClass);
    this.#constructTable(divClass);
  }
}
