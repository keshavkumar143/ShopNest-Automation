const path = require('path');
const ResultReporter = require('../utils/resultReporter');

const specsDir = path.join(__dirname, '..', 'test', 'specs');

let resultReporter;

const baseConfig = {
  specs: [
    path.join(specsDir, 'login.spec.js'),
    path.join(specsDir, 'navigation.spec.js'),
    path.join(specsDir, 'cart.spec.js'),
  ],
  suites: {
    login: [path.join(specsDir, 'login.spec.js')],
    navigation: [path.join(specsDir, 'navigation.spec.js')],
    cart: [path.join(specsDir, 'cart.spec.js')],
    full: [
      path.join(specsDir, 'login.spec.js'),
      path.join(specsDir, 'navigation.spec.js'),
      path.join(specsDir, 'cart.spec.js'),
    ],
  },
  maxInstances: 1,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  waitforTimeout: 10000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 3,

  onPrepare() {
    resultReporter = new ResultReporter();
  },
  afterTest(test, context, { passed, error }) {
    if (passed) {
      resultReporter.onTestPass(test);
    } else {
      resultReporter.onTestFail({ ...test, error });
    }
  },
  onComplete() {
    resultReporter.onComplete();
  },
};

module.exports = { baseConfig };
