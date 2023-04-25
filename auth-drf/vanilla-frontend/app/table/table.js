if (!('dynamicTable' in globalVars)) {
  import('/libs/dynamicTable.js')
    .then((mod) => {
      const DynamicTable = mod.DynamicTable;
      const dynamicTable = new DynamicTable({
        columns: ['Name', 'Income', 'Admin'],
        rows: [
          { Name: 'Adam', Income: 20, Admin: false },
          { Name: 'Eva', Income: 10, Admin: true },
          { Name: 'Isaac', Income: 40, Admin: false },
          { Name: 'Aaron', Income: 30, Admin: true },
          { Name: 'Asenath', Income: 50, Admin: false },
        ],
      });
      dynamicTable.construct('table');

      globalVars['dynamicTable'] = dynamicTable;
    });
} else {
  globalVars['dynamicTable'].construct('table');
}


const modal = document.querySelector('.modal');
const modalOpenButton = document.querySelector('#modalOpenButton');
const modalCloseButton = modal.querySelector('#modalCloseButton');
const modalAddRowButton = modal.querySelector('#addRowButton');

modal.style.display = 'none';

modalOpenButton.addEventListener('click', () => {
  modal.classList.replace('hide', 'show');
  modal.style.display = 'block';
});

modalCloseButton.addEventListener('click', () => {
  modal.classList.replace('show', 'hide');
  setTimeout(() => { modal.style.display = 'none'}, 400);
});


modalAddRowButton.addEventListener('click', () => {
  const nameValue = modal.querySelector('#name').value;
  const incomeValue = modal.querySelector('#income').value;
  const adminValue = modal.querySelector('#admin').value;

  // TODO: Check value types.
  globalVars['dynamicTable'].addRow({
    Name: nameValue,
    Income: parseInt(incomeValue),
    Admin: (adminValue == 'true'),
  });
  globalVars['dynamicTable'].constructTable('table');
  modal.classList.replace('show', 'hide');
  setTimeout(() => { modal.style.display = 'none'}, 400);
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.classList.replace('show', 'hide');
    setTimeout(() => { modal.style.display = 'none'}, 400);
  }
});
