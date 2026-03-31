/**
 * Cart Functionality Tests
 *
 * Tests the complete cart workflow:
 * - Adding products from Product Detail screen
 * - Viewing cart items and total price
 * - Removing items from cart
 *
 * Note: After tapping "Add to Cart", the app shows a toast banner
 * and auto-navigates back to Home after 1.2s (no native alert).
 */
const LoginScreen = require('../../screenObjects/LoginScreen');
const HomeScreen = require('../../screenObjects/HomeScreen');
const ProductScreen = require('../../screenObjects/ProductScreen');
const CartScreen = require('../../screenObjects/CartScreen');

describe('Cart Functionality', () => {
  before(async () => {
    await LoginScreen.waitForScreen();
    await LoginScreen.login('testuser', 'password123');
    await HomeScreen.waitForScreen();
  });

  it('should add a product to cart', async () => {
    await HomeScreen.tapProduct('1');
    await ProductScreen.waitForScreen();

    const productName = await ProductScreen.getProductName();
    expect(productName).toBeTruthy();

    // Tap add to cart - app shows banner and auto-navigates back after 1.2s
    await ProductScreen.tapAddToCart();
    await driver.pause(2000);
  });

  it('should display items in the cart', async () => {
    // Should be back on Home screen after auto-navigate
    await HomeScreen.waitForScreen();
    await HomeScreen.tapCartButton();
    await CartScreen.waitForScreen();

    const isEmpty = await CartScreen.isCartEmpty();
    expect(isEmpty).toBe(false);

    const itemName = await CartScreen.getItemName(0);
    expect(itemName).toBeTruthy();
  });

  it('should show total price', async () => {
    const total = await CartScreen.getTotalPrice();
    expect(total).toContain('$');
  });

  it('should remove an item from cart', async () => {
    await CartScreen.removeItem(0);

    const isEmpty = await CartScreen.isCartEmpty();
    expect(isEmpty).toBe(true);

    const emptyMsg = await CartScreen.getEmptyMessage();
    expect(emptyMsg).toBe('Your cart is empty');
  });
});
