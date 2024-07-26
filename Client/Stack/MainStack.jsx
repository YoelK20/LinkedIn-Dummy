import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { MyTab } from "./Tab/TabScreen"

const Stack = createNativeStackNavigator();
export default function MainStack() {
  const { isLogin } = useContext(LoginContext);
  return (
 
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="register"
          screenOptions={{ headerShown: false }}
        >
          {isLogin ? (
            <>
              {/* <Stack.Screen name="home" component={HomePage} /> */}
              <Stack.Screen name="home" component={MyTab} options={{headerShown: false}}/> 
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
