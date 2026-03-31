/**
 * Utility helpers for Appium-based mobile test automation.
 * All element lookups use accessibilityLabel selectors (~id).
 */

// Wait for an element to be visible on screen
async function waitForElement(accessibilityId, timeout = 10000) {
  const element = await $(`~${accessibilityId}`);
  await element.waitForDisplayed({ timeout });
  return element;
}

// Tap an element by accessibility ID
async function tapElement(accessibilityId) {
  const element = await waitForElement(accessibilityId);
  await element.click();
}

// Set value on an input field (clears existing value first)
async function setInputValue(accessibilityId, value) {
  const element = await waitForElement(accessibilityId);
  await element.clearValue();
  await element.setValue(value);
}

// Get text content of an element
async function getElementText(accessibilityId) {
  const element = await waitForElement(accessibilityId);
  return element.getText();
}

// Clear an input field
async function clearInput(accessibilityId) {
  const element = await waitForElement(accessibilityId);
  await element.clearValue();
}

// Check if an element is currently displayed (returns false if not found)
async function isElementDisplayed(accessibilityId) {
  try {
    const element = await $(`~${accessibilityId}`);
    return await element.isDisplayed();
  } catch {
    return false;
  }
}

module.exports = {
  waitForElement,
  tapElement,
  setInputValue,
  clearInput,
  getElementText,
  isElementDisplayed,
};
