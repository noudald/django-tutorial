import { UnitTests } from '/libs/unittests.js';

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


class TestSuite extends UnitTests {
  testSuiteSimpleTest1() {
    sleep(500);
    this.assertTrue(1 + 1 === 3);
  }

  testSuiteSimpleTest2() {
    sleep(250);
    this.assertTrue(2 * 2 === 4);
  }

  testSuiteSimpleTest3() {
    sleep(250);
    this.assertTrue(2 * 2 === 4);
  }

  testSuiteAssertEqual() {
    this.assertEqual(2 + 2, 4, '2 + 2 should be 4');
    this.assertEqual(2 + 2, 5, '2 + 2 should be 5');
  }

  testServerConnection() {
    // TODO: Doesn't work!
    const img = document.createElement('img');
    const server_url = 'http://localhost:8000'
    img.onerror = () => {
      this.raiseError(`Server server ${server_url} is offline`);
    };
    img.src = server_url + '/static/ping.png';
  }
}


const testSuite = new TestSuite({
  testNames: ['testSuite', 'testServer'],
  reportClass: 'reportTestSuite',
  logClass: 'logTestSuite',
});
testSuite.runTests()
