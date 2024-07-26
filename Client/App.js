import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './Stack/MainStack';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';
import { LoginProvider } from './contexts/LoginContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
        <ApolloProvider client={client}>
          <LoginProvider>
            <MainStack />
          </LoginProvider>
        </ApolloProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
