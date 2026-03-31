/**
 * Navigation Flow Tests
 *
 * Tests screen-to-screen navigation:
 * - Home <-> Product Detail
 * - Home <-> Cart
 * - Full flow: Home > Product > Add to Cart > Cart
 *
 * Note: After tapping "Add to Cart", the app shows a toast banner
 * and auto-navigates back to Home after 1.2s (no native alert).
 */
const LoginScreen = require('../../screenObjects/LoginScreen');
const HomeScreen = require('../../screenObjects/HomeScreen');
const ProductScreen = require('../../screenObjects/ProductScreen');
const CartScreen = require('../../screenObjects/CartScreen');

describe('Navigation Flow', () => {
  before(async () => {
    await LoginScreen.waitForScreen();
    await LoginScreen.login('testuser', 'password123');
    await HomeScreen.waitForScreen();
  });

  it('should navigate from Home to Product Detail', async () => {
    await HomeScreen.tapProduct('1');
    await ProductScreen.waitForScreen();

    const name = await ProductScreen.getProductName();
    expect(name).toBeTruthy();
  });

  it('should navigate back to Home from Product Detail', async () => {
    await driver.back();
    await HomeScreen.waitForScreen();

    const title = await HomeScreen.getTitleText();
    expect(title).toBe('Products');
  });

  it('should navigate from Home to Cart', async () => {
    await HomeScreen.tapCartButton();
    await CartScreen.waitForScreen();

    const isEmpty = await CartScreen.isCartEmpty();
    expect(isEmpty).toBe(true);
  });

  it('should navigate back to Home from Cart', async () => {
    await driver.back();
    await HomeScreen.waitForScreen();

    const title = await HomeScreen.getTitleText();
    expect(title).toBe('Products');
  });

  it('should complete full flow: Home > Product > Add to Cart > Cart', async () => {
    await HomeScreen.tapProduct('2');
    await ProductScreen.waitForScreen();

    // Tap add to cart - app shows banner and auto-navigates back after 1.2s
    await ProductScreen.tapAddToCart();
    await driver.pause(2000);

    // Should be back on Home screen after auto-navigate
    await HomeScreen.waitForScreen();
    await HomeScreen.tapCartButton();
    await CartScreen.waitForScreen();

    const itemName = await CartScreen.getItemName(0);
    expect(itemName).toBeTruthy();

    // Clean up - remove item for other test suites
    await CartScreen.removeItem(0);
  });
});
