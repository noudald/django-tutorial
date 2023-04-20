if (!('dynamicTable' in globalVars)) {
  import('/libs/dynamicTable.js')
    .then((mod) => {
      const DynamicTable = mod.DynamicTable;
      globalVars['dynamicTable'] = new DynamicTable({
        columns: ['Name', 'Income', 'Admin'],
        rows: [
          { Name: 'Adam', Income: 20, Admin: false },
          { Name: 'Eva', Income: 10, Admin: true },
          { Name: 'Isaac', Income: 40, Admin: false },
          { Name: 'Aaron', Income: 30, Admin: true },
          { Name: 'Asenath', Income: 50, Admin: false },
        ],
      });
      globalVars['dynamicTable'].constructTable('table');
    });
} else {
  globalVars['dynamicTable'].constructTable('table');
}

