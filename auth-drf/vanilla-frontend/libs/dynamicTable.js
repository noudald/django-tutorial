export class DynamicTable {
  constructor(tableDict) {
    this.rowSize = 0;
    this.colSize = 0;
    this.columns = [];
    this.rows = [];
    this.index = []
    this.sortOn = null;

    for (let key in tableDict) {
      this.columns.push(key);
      if (this.colSize > 0) {
        if (this.rowSize != tableDict[key].length) {
          throw new RuntimeError('Sizes of columns should be the same');
        }
      } else {
        this.rowSize = tableDict[key].length;
      }
      this.colSize++;
    }

    for (var i = 0; i < this.rowSize; i++) {
      const row = [];
      for (let key in tableDict) {
        row.push(tableDict[key][i]);
      }
      this.rows.push(row);

      this.index.push(i);
    }
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

      this.rows[i].forEach((elm) => {
        const tableTd = document.createElement('td');
        tableTd.innerHTML = elm;
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
          td.blur()
          if (nextTr) {
            const nextTd = nextTr.children[currentColumnIndex];
            nextTd.focus();
          }
        } else if (e.key === 'ArrowUp') {
          const currentTr = td.parentNode;
          const currentColumnIndex = Array.from(currentTr.children).indexOf(td);
          const previousTr = currentTr.previousElementSibling;
          td.blur();
          if (previousTr) {
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


        // if (anchorOffset == 0) {
        //   console.log('Move to left entry');
        // } else if (anchorOffset == textLength) {
        //   console.log('Move to right entry');
        // }

        // console.log(selection);
        // console.log(range);
        // console.log(td, td.textContent);

        // range.setStart(td, td.textContent.length);
        // range.setEnd(td, td.textContent.length);
      });

      td.addEventListener('focusout', (e) => {
        const currentTr = td.parentNode;
        const currentColumnIndex = Array.from(currentTr.children).indexOf(td);
        const currentTable = currentTr.parentNode;
        const currentRowIndex = Array.from(currentTable.children).indexOf(currentTr);

        this.rows[currentRowIndex - 1][currentColumnIndex - 1] = td.innerHTML;
      });
    });
  }
}
