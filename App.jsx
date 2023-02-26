import * as React from 'react';

import 'react-native-gesture-handler';
import AnimatedSplash from 'react-native-animated-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LogBox} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import Display from './src/screens/Display';
import PlayerCards from './src/screens/PlayerCards';

import vGif from './assets/v_logo.gif';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

const Stack = createStackNavigator();
LogBox.ignoreLogs(['Warning: ...']);

function AppContainer() {
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
            name="Wallpaper"
            component={Display}
            options={{
              headerShown: true,
              title: 'Wallpaper',
              headerStyle: {
                backgroundColor: '#111111',
              },
              headerShadowVisible: false,
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen
            name="PlayerCards"
            component={PlayerCards}
            options={{
              headerShown: true,
              title: 'Player Cards',
              headerStyle: {
                backgroundColor: '#111111',
              },
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <AnimatedSplash
      translucent={false}
      isLoaded={isLoaded}
      logoImage={vGif}
      backgroundColor={'#000000'}
      logoHeight={250}
      logoWidth={250}>
      <AppContainer />
    </AnimatedSplash>
  );
}
