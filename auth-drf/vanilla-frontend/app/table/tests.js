import { DynamicTable } from '/libs/dynamicTable.js';
import { UnitTests } from '/libs/unittests.js';


const testTable = new DynamicTable({
  columns: ['a', 'b', 'c'],
  rows: [
    {a: 1, b: 2, c: 3},
    {a: 3, b: 1, c: 2},
    {a: 2, b: 3, c: 1},
    {a: 1, b: 1, c: 1},
  ],
});


class TestDynamicTable extends UnitTests {
  testDynamicTableCreation() {
    this.assertEqual(testTable.colSize, 3, 'Column size should be 3');
    this.assertEqual(testTable.rowSize, 4, 'Row size should be 4');
  }

  testDynamicTableJSON() {
    const jsonTestTable = JSON.stringify(testTable);
    const testTable2 = JSON.parse(jsonTestTable);

    this.assertTrue(
      testTable.equals(testTable2),
      'JSONified parsed test table should be equal to original table'
    );
  }
}


const testDynamicTable = new TestDynamicTable({
  testNames: ['testDynamicTable'],
  reportClass: 'reportDynamicTable',
  logClass: 'logDynamicTable',
});
testDynamicTable.runTests()
