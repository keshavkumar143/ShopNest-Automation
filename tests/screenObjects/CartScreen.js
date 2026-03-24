const { waitForElement, tapElement, getElementText, isElementDisplayed } = require('../utils/helpers');

class CartScreen {
  get screenContainer()   { return $('~cart-screen'); }
  get emptyMessage()      { return $('~cart-empty-message'); }
  get itemList()          { return $('~cart-item-list'); }
  get totalPrice()        { return $('~cart-total-price'); }
  get checkoutButton()    { return $('~cart-checkout-button'); }

  async waitForScreen() {
    await waitForElement('cart-screen');
  }

  async isCartEmpty() {
    return isElementDisplayed('cart-empty-message');
  }

  async getEmptyMessage() {
    return getElementText('cart-empty-message');
  }

  async getTotalPrice() {
    return getElementText('cart-total-price');
  }

  async getItemName(index) {
    return getElementText(`cart-item-${index}-name`);
  }

  async removeItem(index) {
    await tapElement(`cart-item-${index}-remove-button`);
  }

  async tapCheckout() {
    await tapElement('cart-checkout-button');
  }
}

module.exports = new CartScreen();
