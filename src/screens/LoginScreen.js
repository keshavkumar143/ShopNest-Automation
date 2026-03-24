import { View, Text, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <Text testID="login-title">ShopNest Login</Text>
      <Button
        title="Login"
        testID="login-button"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}