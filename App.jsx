import * as React from 'react';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LogBox} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import Display from './src/screens/Display';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

const Stack = createStackNavigator();
LogBox.ignoreLogs(['Warning: ...']);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animationEnabled: false,
            presentation: 'card',
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Display"
            component={Display}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
