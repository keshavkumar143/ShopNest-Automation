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

    await ProductScreen.tapAddToCart();
    await driver.dismissAlert();

    await HomeScreen.waitForScreen();
    await HomeScreen.tapCartButton();
    await CartScreen.waitForScreen();

    const itemName = await CartScreen.getItemName(0);
    expect(itemName).toBeTruthy();

    await CartScreen.removeItem(0);
  });
});
