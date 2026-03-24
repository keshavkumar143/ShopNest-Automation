import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    setErrorMessage('');
    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      testID="login-screen"
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo} testID="login-logo">
          🛍️
        </Text>
        <Text style={styles.title} testID="login-title">
          ShopNest
        </Text>
        <Text style={styles.subtitle} testID="login-subtitle">
          Sign in to continue
        </Text>
      </View>

      <View style={styles.formContainer}>
        {errorMessage ? (
          <Text style={styles.errorText} testID="login-error-message">
            {errorMessage}
          </Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={Colors.placeholder}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          testID="login-username-input"
          accessibilityLabel="login-username-input"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          testID="login-password-input"
          accessibilityLabel="login-password-input"
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          testID="login-button"
          accessibilityLabel="login-button"
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 6,
    letterSpacing: 0.3,
  },
  formContainer: {
    width: '100%',
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 1,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 12,
    elevation: 3,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});