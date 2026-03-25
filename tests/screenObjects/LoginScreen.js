const { waitForElement, setInputValue, clearInput, tapElement, getElementText, isElementDisplayed } = require('../utils/helpers');

class LoginScreen {
  get screenContainer()   { return $('~login-screen'); }
  get logo()              { return $('~login-logo'); }
  get title()             { return $('~login-title'); }
  get subtitle()          { return $('~login-subtitle'); }
  get usernameInput()     { return $('~login-username-input'); }
  get passwordInput()     { return $('~login-password-input'); }
  get loginButton()       { return $('~login-button'); }
  get errorMessage()      { return $('~login-error-message'); }

  async waitForScreen() {
    await waitForElement('login-screen');
  }

  async enterUsername(value) {
    await setInputValue('login-username-input', value);
  }

  async enterPassword(value) {
    await setInputValue('login-password-input', value);
  }

  async tapLogin() {
    await tapElement('login-button');
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.tapLogin();
  }

  async getErrorMessage() {
    return getElementText('login-error-message');
  }

  async isErrorDisplayed() {
    return isElementDisplayed('login-error-message');
  }

  async clearFields() {
    await clearInput('login-username-input');
    await clearInput('login-password-input');
  }

  async getTitleText() {
    return getElementText('login-title');
  }
}

module.exports = new LoginScreen();
