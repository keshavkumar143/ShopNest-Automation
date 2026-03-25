const path = require('path');

const specsDir = path.join(__dirname, '..', 'test', 'specs');

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
};

module.exports = { baseConfig };
