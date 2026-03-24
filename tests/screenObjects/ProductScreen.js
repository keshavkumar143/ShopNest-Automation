const { waitForElement, tapElement, getElementText } = require('../utils/helpers');

class ProductScreen {
  get screenContainer()    { return $('~product-screen'); }
  get productImage()       { return $('~product-image'); }
  get productName()        { return $('~product-name'); }
  get productPrice()       { return $('~product-price'); }
  get productDescription() { return $('~product-description'); }
  get addToCartButton()    { return $('~product-add-to-cart-button'); }

  async waitForScreen() {
    await waitForElement('product-screen');
  }

  async getProductName() {
    return getElementText('product-name');
  }

  async getProductPrice() {
    return getElementText('product-price');
  }

  async tapAddToCart() {
    await tapElement('product-add-to-cart-button');
  }
}

module.exports = new ProductScreen();
