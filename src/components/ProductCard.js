import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export default function ProductCard({ product, onPress, testID }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      testID={testID}
      accessibilityLabel={testID}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        testID={`${testID}-image`}
      />
      <View style={styles.info}>
        <Text style={styles.name} testID={`${testID}-name`} accessibilityLabel={`${testID}-name`} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price} testID={`${testID}-price`} accessibilityLabel={`${testID}-price`}>
          ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: 110,
    height: 110,
    backgroundColor: Colors.border,
  },
  info: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primary,
  },
});
