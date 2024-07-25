import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";


const Stack = createNativeStackNavigator()
export default function MainStack() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='login' screenOptions={{headerShown: false}}>
          <Stack.Screen name='login' component={LoginScreen}/>
          <Stack.Screen name='register' component={RegisterScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}