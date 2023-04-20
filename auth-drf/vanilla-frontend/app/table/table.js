if (!('dynamicTable' in globalVars)) {
  import('/libs/dynamicTable.js')
    .then((mod) => {
      const DynamicTable = mod.DynamicTable;
      globalVars['dynamicTable'] = new DynamicTable({
        Name: ['Adam', 'Eva', 'Isaac', 'Aaron', 'Asenath'],
        Income: [19, 10, 40, 30, 50],
        Admin: [false, true, false, true, false],
      });
      globalVars['dynamicTable'].constructTable('table');
    });
} else {
  globalVars['dynamicTable'].constructTable('table');
}

