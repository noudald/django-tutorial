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

const testTable2 = new DynamicTable({
  columns: ['a', 'b', 'c'],
  rows: [
    {a: 1, b: 2, c: 3},
    {a: 3, b: 1, c: 2},
  ],
});

const testTable3 = new DynamicTable({
  columns: ['a', 'b'],
  rows: [
    {a: 1, b: 2},
    {a: 3, b: 1},
    {a: 2, b: 3},
    {a: 1, b: 1},
  ],
});


class TestDynamicTable extends UnitTests {
  testDynamicTableCreation() {
    this.assertEqual(testTable.colSize, 3, 'Column size should be 3');
    this.assertEqual(testTable.rowSize, 4, 'Row size should be 4');
  }

  testDynamicTableEquals() {
    this.assertTrue(testTable.equals(testTable), 'Table should be equal to itself');
    this.assertFalse(testTable.equals(testTable2), 'Two tables with different rows should not be equal');
    this.assertFalse(testTable.equals(testTable3), 'Two tables with different columns should not be equal');
  }

  testDynamicTableJSON() {
    const jsonTestTable = JSON.stringify(testTable);
    const testTable_ = JSON.parse(jsonTestTable);

    this.assertTrue(
      testTable.equals(testTable_),
      'JSONified parsed test table should be equal to original table'
    );
  }

  testDynamicTableFilter() {
    testTable.filterMask.forEach((m) => this.assertTrue(m, 'Filter mask should only contain true'));
    testTable.filter((row) => (row.a == 1));
    this.assertArrayEqual(
      testTable.filterMask,
      [true, false, false, true],
      'Filter should select all rows with a = 1'
    );
  }
}


const testDynamicTable = new TestDynamicTable({
  testNames: ['testDynamicTable'],
  reportClass: 'reportDynamicTable',
  logClass: 'logDynamicTable',
});
testDynamicTable.runTests()
