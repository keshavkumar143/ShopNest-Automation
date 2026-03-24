import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants/theme';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'ShopNest', headerBackVisible: false }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'My Cart' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}