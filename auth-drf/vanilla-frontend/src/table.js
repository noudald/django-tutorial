if (!('dynamicTable' in globalVars)) {
  import('./dynamicTable.js')
    .then((mod) => {
      globalVars['dynamicTable'] = new mod.DynamicTable({
        Name: ['Adam', 'Eva', 'Isaac', 'Aaron', 'Asenath'],
        Income: [20, 10, 40, 30, 50],
        Admin: [false, true, false, true, false],
      });
      globalVars['dynamicTable'].constructTable('table');
    });
} else {
  globalVars['dynamicTable'].constructTable('table');
}

