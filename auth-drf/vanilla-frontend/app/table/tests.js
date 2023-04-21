import { DynamicTable } from '/libs/dynamicTable.js';
import { UnitTests } from '/libs/unittests.js';


class TestDynamicTable extends UnitTests {
  testDynamicTableCreation() {
    const table = new DynamicTable({
      columns: ['a', 'b', 'c'],
      rows: [
        {a: 1, b: 2, c: 3},
        {a: 3, b: 1, c: 2},
        {a: 2, b: 3, c: 1},
        {a: 1, b: 1, c: 1},
      ],
    });

    this.assertEqual(table.colSize, 3, 'Column size should be 3');
    this.assertEqual(table.rowSize, 4, 'Row size should be 4');
  }
}


const testDynamicTable = new TestDynamicTable({
  testNames: ['testDynamicTable'],
  reportClass: 'reportDynamicTable',
  logClass: 'logDynamicTable',
});
testDynamicTable.runTests()
