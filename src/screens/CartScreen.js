import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useCartStore } from '../utils/cartStore';
import CartItem from '../components/CartItem';
import CheckoutModal from '../components/CheckoutModal';
import { Colors } from '../constants/theme';

export default function CartScreen({ navigation }) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setCheckoutVisible(true);
  };

  const handleOrderPlaced = () => {
    setCheckoutVisible(false);
    clearCart();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container} testID="cart-screen" accessibilityLabel="cart-screen">
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText} testID="cart-empty-message" accessibilityLabel="cart-empty-message">
            Your cart is empty
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(_, index) => index.toString()}
            testID="cart-item-list"
            accessibilityLabel="cart-item-list"
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <CartItem
                item={item}
                onRemove={() => removeFromCart(item.id)}
                testID={`cart-item-${index}`}
              />
            )}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue} testID="cart-total-price" accessibilityLabel="cart-total-price">
                ${totalPrice}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              testID="cart-checkout-button"
              accessibilityLabel="cart-checkout-button"
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <CheckoutModal
        visible={checkoutVisible}
        cart={cart}
        totalPrice={totalPrice}
        onClose={() => setCheckoutVisible(false)}
        onOrderPlaced={handleOrderPlaced}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingBottom: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
