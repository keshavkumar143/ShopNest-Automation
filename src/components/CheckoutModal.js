import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/theme';

const PHASE_SUMMARY = 'summary';
const PHASE_PROCESSING = 'processing';
const PHASE_SUCCESS = 'success';

export default function CheckoutModal({ visible, cart, totalPrice, onClose, onOrderPlaced }) {
  const [phase, setPhase] = useState(PHASE_SUMMARY);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.6)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const successTextOpacity = useRef(new Animated.Value(0)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setPhase(PHASE_SUMMARY);
      slideAnim.setValue(0);
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible]);

  const startProcessing = () => {
    setPhase(PHASE_PROCESSING);

    spinAnim.setValue(0);
    const spinLoop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.start();

    const dotBounce = (anim, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: -12, duration: 300, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 300, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        ])
      );
    dotBounce(dotAnim1, 0).start();
    dotBounce(dotAnim2, 150).start();
    dotBounce(dotAnim3, 300).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.6, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    setTimeout(() => {
      spinLoop.stop();
      showSuccess();
    }, 2500);
  };

  const showSuccess = () => {
    setPhase(PHASE_SUCCESS);
    checkScale.setValue(0);
    checkOpacity.setValue(0);
    successTextOpacity.setValue(0);

    Animated.sequence([
      Animated.parallel([
        Animated.spring(checkScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 6,
        }),
        Animated.timing(checkOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(successTextOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      onOrderPlaced();
    }, 2200);
  };

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const renderSummary = () => (
    <View testID="checkout-summary" accessibilityLabel="checkout-summary">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <TouchableOpacity
          onPress={onClose}
          testID="checkout-close-button"
          accessibilityLabel="checkout-close-button"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {cart.map((item, index) => (
        <View key={index} style={styles.summaryRow}>
          <Text style={styles.summaryItem} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.summaryPrice}>₹{item.price}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue} testID="checkout-total" accessibilityLabel="checkout-total">₹{totalPrice}</Text>
      </View>

      <TouchableOpacity
        style={styles.payButton}
        onPress={startProcessing}
        testID="checkout-pay-button"
        accessibilityLabel="checkout-pay-button"
      >
        <Text style={styles.payButtonText}>Pay ₹{totalPrice}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProcessing = () => (
    <View style={styles.centerContent} testID="checkout-processing" accessibilityLabel="checkout-processing">
      <Animated.View
        style={[
          styles.spinner,
          {
            transform: [{ rotate: spinInterpolate }],
            opacity: pulseAnim,
          },
        ]}
      />
      <Text style={styles.processingTitle}>Processing Payment</Text>
      <View style={styles.dotsContainer}>
        {[dotAnim1, dotAnim2, dotAnim3].map((anim, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, { transform: [{ translateY: anim }] }]}
          />
        ))}
      </View>
      <Text style={styles.processingSubtext}>Please do not close this screen</Text>
    </View>
  );

  const renderSuccess = () => (
    <View style={styles.centerContent} testID="checkout-success" accessibilityLabel="checkout-success">
      <Animated.View
        style={[
          styles.checkCircle,
          {
            transform: [{ scale: checkScale }],
            opacity: checkOpacity,
          },
        ]}
      >
        <Text style={styles.checkMark}>✓</Text>
      </Animated.View>
      <Animated.Text
        style={[styles.successTitle, { opacity: successTextOpacity }]}
        testID="checkout-success-message"
        accessibilityLabel="checkout-success-message"
      >
        Order Placed Successfully!
      </Animated.Text>
      <Animated.Text style={[styles.successSubtext, { opacity: successTextOpacity }]}>
        Thank you for shopping with ShopNest
      </Animated.Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      testID="checkout-modal"
      accessibilityLabel="checkout-modal"
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.sheet,
            { transform: [{ translateY }] },
          ]}
        >
          {phase === PHASE_SUMMARY && renderSummary()}
          {phase === PHASE_PROCESSING && renderProcessing()}
          {phase === PHASE_SUCCESS && renderSuccess()}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    minHeight: 340,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  closeIcon: {
    fontSize: 22,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  summaryItem: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
    marginRight: 12,
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  payButton: {
    backgroundColor: Colors.success,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  spinner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: Colors.border,
    borderTopColor: Colors.primary,
    marginBottom: 24,
  },
  processingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  processingSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  checkCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 6,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  checkMark: {
    fontSize: 44,
    color: '#fff',
    fontWeight: '800',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
