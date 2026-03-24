const { waitForElement, tapElement, getElementText } = require('../utils/helpers');

class HomeScreen {
  get screenContainer()  { return $('~home-screen'); }
  get title()            { return $('~home-title'); }
  get cartButton()       { return $('~home-cart-button'); }
  get productList()      { return $('~home-product-list'); }

  async waitForScreen() {
    await waitForElement('home-screen');
  }

  async getTitleText() {
    return getElementText('home-title');
  }

  async tapCartButton() {
    await tapElement('home-cart-button');
  }

  async tapProduct(productId) {
    await tapElement(`product-card-${productId}`);
  }

  async getProductName(productId) {
    return getElementText(`product-card-${productId}-name`);
  }

  async getProductPrice(productId) {
    return getElementText(`product-card-${productId}-price`);
  }
}

module.exports = new HomeScreen();
