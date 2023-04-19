import { DynamicTable } from '/libs/dynamicTable.js';
import { UnitTests } from '/libs/unittests.js';


class TestDynamicTable extends UnitTests {
  testDynamicTableCreation() {
    // TODO: This test should fail!
    const table = new DynamicTable({
      columns: ['a', 'b', 'c'],
      data: [
        {a: 1, b: 2, c: 3},
        {a: 3, b: 1, c: 2},
        {a: 2, b: 3, c: 1},
        {a: 1, b: 1, c: 1},
      ],
    });
  }
}


const testDynamicTable = new TestDynamicTable({
  testNames: ['testDynamicTable'],
  reportClass: 'reportDynamicTable',
  logClass: 'logDynamicTable',
});
testDynamicTable.runTests()
