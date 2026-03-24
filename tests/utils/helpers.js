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

async function isElementDisplayed(accessibilityId) {
  const element = await $(`~${accessibilityId}`);
  return element.isDisplayed();
}

module.exports = {
  waitForElement,
  tapElement,
  setInputValue,
  getElementText,
  isElementDisplayed,
};
