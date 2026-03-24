import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export default function CartItem({ item, onRemove, testID }) {
  return (
    <View style={styles.card} testID={testID}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        testID={`${testID}-image`}
      />
      <View style={styles.info}>
        <Text style={styles.name} testID={`${testID}-name`} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price} testID={`${testID}-price`}>
          ₹{item.price}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
        testID={`${testID}-remove-button`}
        accessibilityLabel={`${testID}-remove-button`}
      >
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: 84,
    height: 84,
    backgroundColor: Colors.border,
  },
  info: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primary,
  },
  removeButton: {
    padding: 16,
    marginRight: 4,
  },
  removeText: {
    fontSize: 20,
    color: Colors.error,
    fontWeight: '700',
  },
});
