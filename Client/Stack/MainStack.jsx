import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { HomePage } from "../screens/HomePage";

const Stack = createNativeStackNavigator();
export default function MainStack() {
  const { isLogin } = useContext(LoginContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }}
      >
        {isLogin ? (
          <>
            <Stack.Screen name="home" component={HomePage} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
