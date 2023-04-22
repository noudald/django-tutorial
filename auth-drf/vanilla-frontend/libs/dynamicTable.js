export class DynamicTable {
  constructor({ columns, rows }) {
    this.columns = columns;
    this.rows = rows;

    this.colSize = this.columns.length;
    this.rowSize = this.rows.length;

    this.index = [...Array(this.rowSize).keys()];
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

  constructTable(divClass) {
    const tableDiv = document.querySelector(`.${divClass}`);
    const tableElm = document.createElement('table');

    const tableTr = document.createElement('tr');
    const tableTh = document.createElement('th');

    tableTh.innerHTML = 'Index';
    tableTr.appendChild(tableTh);

    this.columns.forEach((column) => {
      const tableTh = document.createElement('th');

      tableTh.innerHTML = column;
      tableTr.appendChild(tableTh);
    });

    tableElm.appendChild(tableTr);

    this.index.forEach((i) => {
      const tableTr = document.createElement('tr');

      const tableTd = document.createElement('td');
      tableTd.innerHTML = i;
      tableTr.appendChild(tableTd);

      const row = this.rows[i];
      this.columns.forEach((col) => {
        const tableTd = document.createElement('td');
        tableTd.innerHTML = row[col];
        tableTd.contentEditable = 'true';
        tableTr.appendChild(tableTd);
      });

      tableElm.appendChild(tableTr);
    });

    tableDiv.innerHTML = '';
    tableDiv.appendChild(tableElm);

    tableDiv.querySelectorAll('th').forEach((th) => {
      th.addEventListener('click', () => {
        console.log('click', th.innerHTML)
      });
    });

    tableDiv.querySelectorAll('td').forEach((td) => {
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
        const currentColumnIndex = Array.from(currentTr.children).indexOf(td);
        const currentColumn = this.columns[currentColumnIndex - 1];
        const currentTable = currentTr.parentNode;
        const currentRowIndex = Array.from(currentTable.children).indexOf(currentTr);

        this.rows[currentRowIndex - 1][currentColumn] = td.innerHTML;
      });
    });
  }
}
