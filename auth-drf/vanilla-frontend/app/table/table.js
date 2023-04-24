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
      dynamicTable.constructTable('table');

      globalVars['dynamicTable'] = dynamicTable;
    });
} else {
  globalVars['dynamicTable'].constructTable('table');
}

// Create a search filter even listener.
const inputFilter = document.querySelector('#filter');
inputFilter.addEventListener('input', () => {
  globalVars['dynamicTable'].filter((row) => {
    for (let [key, value] of Object.entries(row)) {
      if (String(value).includes(inputFilter.value)) {
        return true;
      }
    }
    return false;
  });
  globalVars['dynamicTable'].constructTable('table');
});
