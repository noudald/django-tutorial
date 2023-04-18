class UnitTests {
  constructor(testSuites) {
    this.testSuites = testSuites;
  }

  addTest(testName, testFunction) {
    this.tests.push({
      testName: testName,
      testFunction: testFunction
    });
  }

  raiseError(msg) {
    throw new Error(msg);
  }

  assertTrue(expression, msg = null) {
    if (!(expression)) {
      if (msg) {
        throw new Error(`${msg} failed`);
      } else {
        throw new Error('assertTrue failed');
      }
    }
  }

  assertEqual(value1, value2, msg = null) {
    if (value1 != value2) {
      if (msg) {
        throw new Error(`${msg} failed`);
      } else {
        throw new Error('assertEqual failed');
      }
    }
  }

  log(message) {
    const logElement = document.querySelector('.log');

    const time = new Date();
    const timeString = time.toLocaleTimeString();

    logElement.innerHTML += `${timeString}: ${message}<br/>`;
  }

  updateReport(numberOfTests, numberOfPasses, numberOfFails) {
    const reportDiv = document.querySelector('.report');
    reportDiv.innerHTML = `
    <p>
      <table>
        <tr>
          <th>Total number of tests:</th><th>${numberOfTests}</th>
        </tr>
        <tr>
          <th>Number of passed tests:</th><th>${numberOfPasses}</th>
        </tr>
        <tr>
          <th>Number of failed tests:</th><th>${numberOfFails}</th>
        </tr>
      </table>
    </p>`;
  }

  runTests() {
    document.addEventListener('DOMContentLoaded', () => {
      var numberOfTests = 0;
      var numberOfPasses = 0;
      var numberOfFails = 0;

      this.updateReport(numberOfTests, numberOfPasses, numberOfFails);
      this.testSuites.forEach((testSuiteName) => {
        const logElement = document.querySelector('.log');
        logElement.innerHTML += `<h1>TestSuite ${testSuiteName}`;

        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
          .filter((methodName) => methodName.startsWith(testSuiteName))
          .forEach((testName) => {
            setTimeout(() => {
              numberOfTests++;
              try {
                this[testName]();
                numberOfPasses++;
                this.log(`${testName}...<span style="color: #00ff00">passed</span>`);
              } catch (error) {
                numberOfFails++;
                this.log(`${testName}...<span style="color: #ff0000">failed (${error})</span>`);
              }
              this.updateReport(numberOfTests, numberOfPasses, numberOfFails);
            }, 0);
          });
      });
    });
  }
}
