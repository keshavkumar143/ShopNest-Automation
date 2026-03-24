import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Colors } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const handleProductPress = (product) => {
    navigation.navigate('Product', { product });
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container} testID="home-screen" accessibilityLabel="home-screen">
      <View style={styles.header}>
        <Text style={styles.heading} testID="home-title" accessibilityLabel="home-title">
          Products
        </Text>
        <TouchableOpacity
          onPress={handleCartPress}
          testID="home-cart-button"
          accessibilityLabel="home-cart-button"
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>🛒 Cart</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        testID="home-product-list"
        accessibilityLabel="home-product-list"
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
            testID={`product-card-${item.id}`}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 0.5,
  },
  cartButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 2,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
});
