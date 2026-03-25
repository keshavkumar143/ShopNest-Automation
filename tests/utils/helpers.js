async function waitForElement(accessibilityId, timeout = 10000) {
  const element = await $(`~${accessibilityId}`);
  await element.waitForDisplayed({ timeout });
  return element;
}

async function tapElement(accessibilityId) {
  const element = await waitForElement(accessibilityId);
  await element.click();
}

async function setInputValue(accessibilityId, value) {
  const element = await waitForElement(accessibilityId);
  await element.clearValue();
  await element.setValue(value);
}

async function getElementText(accessibilityId) {
  const element = await waitForElement(accessibilityId);
  return element.getText();
}

async function clearInput(accessibilityId) {
  const element = await waitForElement(accessibilityId);
  await element.clearValue();
}

async function isElementDisplayed(accessibilityId) {
  try {
    const element = await $(`~${accessibilityId}`);
    return await element.isDisplayed();
  } catch {
    return false;
  }
}

async function dismissNativeAlert(timeout = 5000) {
  await driver.waitUntil(
    async () => {
      try {
        await driver.getAlertText();
        return true;
      } catch {
        return false;
      }
    },
    { timeout, timeoutMsg: 'No alert appeared within timeout' }
  );
  await driver.dismissAlert();
}

module.exports = {
  waitForElement,
  tapElement,
  setInputValue,
  clearInput,
  getElementText,
  isElementDisplayed,
  dismissNativeAlert,
};
