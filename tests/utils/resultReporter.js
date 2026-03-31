const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, '..', 'results');

function ensureResultsDir() {
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
}

class ResultReporter {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      summary: { total: 0, passed: 0, failed: 0 },
      passed: [],
      failed: [],
    };
  }

  onTestPass(test) {
    this.results.summary.total++;
    this.results.summary.passed++;
    this.results.passed.push({
      suite: test.parent,
      title: test.title,
      duration: test.duration,
    });
  }

  onTestFail(test) {
    this.results.summary.total++;
    this.results.summary.failed++;
    this.results.failed.push({
      suite: test.parent,
      title: test.title,
      duration: test.duration,
      error: test.error?.message || 'Unknown error',
      stack: test.error?.stack || '',
    });
  }

  onComplete() {
    ensureResultsDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(resultsDir, `test-results-${timestamp}.json`);
    fs.writeFileSync(filePath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Test results saved to: ${filePath}`);
    console.log(`   ✅ Passed: ${this.results.summary.passed}  ❌ Failed: ${this.results.summary.failed}  Total: ${this.results.summary.total}\n`);
  }
}

module.exports = ResultReporter;
