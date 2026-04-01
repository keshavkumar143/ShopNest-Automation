const path = require('path');
const fs = require('fs');
const ResultReporter = require('../utils/resultReporter');

const specsDir = path.join(__dirname, '..', 'test', 'specs');
const tempResultsFile = path.join(__dirname, '..', 'results', '.temp-results.json');
const screenshotsDir = path.join(__dirname, '..', 'screenshots');

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

  before() {
    const dir = path.dirname(tempResultsFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(tempResultsFile, JSON.stringify({ passed: [], failed: [] }));
  },
  afterTest(test, context, { passed, error }) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = test.title.replace(/[^a-zA-Z0-9]/g, '_');
    const subfolder = passed ? 'passed' : 'failed';
    const ssDir = path.join(screenshotsDir, subfolder);
    if (!fs.existsSync(ssDir)) {
      fs.mkdirSync(ssDir, { recursive: true });
    }
    const ssPath = path.join(ssDir, `${sanitizedTitle}_${timestamp}.png`);
    browser.saveScreenshot(ssPath);

    const data = JSON.parse(fs.readFileSync(tempResultsFile, 'utf8'));
    if (passed) {
      data.passed.push({
        suite: test.parent,
        title: test.title,
        duration: test.duration,
        screenshot: ssPath,
      });
    } else {
      data.failed.push({
        suite: test.parent,
        title: test.title,
        duration: test.duration,
        error: error?.message || 'Unknown error',
        stack: error?.stack || '',
        screenshot: ssPath,
      });
    }
    fs.writeFileSync(tempResultsFile, JSON.stringify(data));
  },
  onComplete() {
    const reporter = new ResultReporter();
    if (fs.existsSync(tempResultsFile)) {
      const data = JSON.parse(fs.readFileSync(tempResultsFile, 'utf8'));
      data.passed.forEach((t) => reporter.onTestPass(t));
      data.failed.forEach((t) => reporter.onTestFail(t));
      try { fs.unlinkSync(tempResultsFile); } catch (_) {}
    }
    reporter.onComplete();
  },
};

module.exports = { baseConfig };
