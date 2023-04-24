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

});
