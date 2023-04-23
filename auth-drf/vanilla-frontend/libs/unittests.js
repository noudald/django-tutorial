export class UnitTests {
  constructor({ testNames, reportClass, logClass }) {
    this.testNames = testNames;
    this.reportClass = reportClass;
    this.logClass = logClass;
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
        throw new Error(`"${msg}" failed`);
      } else {
        throw new Error('assertTrue failed');
      }
    }
  }

  assertFalse(expression, msg = null) {
    if ((expression)) {
      if (msg) {
        throw new Error(`"${msg}" failed`);
      } else {
        throw new Error('assertFalse failed');
      }
    }
  }

  assertEqual(value1, value2, msg = null) {
    if (value1 != value2) {
      if (msg) {
        throw new Error(`"${msg}" failed`);
      } else {
        throw new Error('assertEqual failed');
      }
    }
  }

  assertArrayEqual(arr1, arr2, msg = null) {
    if (arr1.length != arr2.length) {
      if (msg) {
        throw new Error(`"${msg}" failed`);
      } else {
        throw new Error('assertArrayEqual failed, arrays not same length');
      }
    }

    for (var i = 0; i < arr1.length; i++) {
      this.assertEqual(arr1[i], arr2[i], msg);
    }
  }

  log(message, logClass = 'log') {
    const logElement = document.querySelector(`.${logClass}`);

    const time = new Date();
    const timeString = time.toLocaleTimeString();

    logElement.innerHTML += `${timeString}: ${message}<br/>`;
  }

  updateReport(numberOfTests, numberOfPasses, numberOfFails) {
    const reportDiv = document.querySelector(`.${this.reportClass}`);
    reportDiv.innerHTML = `
    <p>
      <h2>Report</h2>
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

      this.testNames.forEach((testSuiteName) => {
        const logElement = document.querySelector(`.${this.logClass}`);
        const currentLogClass = `${testSuiteName}Log`;
        logElement.innerHTML += `
          <h2>TestSuite ${testSuiteName}</h2>
          <div class="${currentLogClass}"></div>`;

        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
          .filter((methodName) => methodName.startsWith(testSuiteName))
          .forEach(async (testName) => {
            await setTimeout(() => {
              numberOfTests++;
              try {
                this[testName]();
                numberOfPasses++;
                this.log(
                  `${testName}...<span class="passed">passed</span>`,
                  currentLogClass
                );
              } catch (error) {
                numberOfFails++;
                this.log(
                  `${testName}...<span class="failed">failed (${error})</span>`,
                  currentLogClass
                );
              }
              this.updateReport(numberOfTests, numberOfPasses, numberOfFails);
            }, 0);
          });
      });
    });
  }
}


