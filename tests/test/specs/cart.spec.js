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

    await ProductScreen.tapAddToCart();
    await driver.pause(2000);
  });

  it('should display items in the cart', async () => {
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

  it('should place an order via checkout', async () => {
    await CartScreen.tapCheckout();
    await CartScreen.waitForCheckoutSummary();

    const checkoutTotal = await CartScreen.getCheckoutTotal();
    expect(checkoutTotal).toContain('$');

    await CartScreen.tapPayButton();
    await CartScreen.waitForOrderSuccess();

    const successMsg = await CartScreen.getSuccessMessage();
    expect(successMsg).toBe('Order Placed Successfully!');

    await driver.pause(3000);
    await HomeScreen.waitForScreen();
  });
});
