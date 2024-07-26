import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './Stack/MainStack';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';
import { LoginProvider } from './contexts/LoginContext';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <MainStack />
      </LoginProvider>
    </ApolloProvider>
  );
}
