import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useCartStore } from '../utils/cartStore';
import { Colors } from '../constants/theme';

export default function ProductScreen({ route, navigation }) {
  const { product } = route.params;
  const addToCart = useCartStore((state) => state.addToCart);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerOpacity] = useState(new Animated.Value(0));

  const handleAddToCart = () => {
    addToCart(product);
    setShowBanner(true);
    Animated.timing(bannerOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.goBack();
    }, 1200);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      testID="product-screen"
      accessibilityLabel="product-screen"
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        testID="product-image"
        accessibilityLabel="product-image"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.name} testID="product-name" accessibilityLabel="product-name">
          {product.name}
        </Text>
        <Text style={styles.price} testID="product-price" accessibilityLabel="product-price">
          ${product.price}
        </Text>
        <Text style={styles.description} testID="product-description" accessibilityLabel="product-description">
          {product.description}
        </Text>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          testID="product-add-to-cart-button"
          accessibilityLabel="product-add-to-cart-button"
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {showBanner && (
        <Animated.View
          style={[styles.banner, { opacity: bannerOpacity }]}
          testID="added-to-cart-banner"
          accessibilityLabel="added-to-cart-banner"
        >
          <Text style={styles.bannerText}>✓ {product.name} added to cart</Text>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 320,
    backgroundColor: Colors.surface,
  },
  infoContainer: {
    padding: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 18,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 26,
    marginBottom: 28,
  },
  addToCartButton: {
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
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  banner: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
