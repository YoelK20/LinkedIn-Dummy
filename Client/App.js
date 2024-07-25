import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainStack from './Stack/MainStack';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <MainStack />
  );
}
