import * as React from 'react';

import AnimatedSplash from 'react-native-animated-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient} from '@tanstack/react-query';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

// import HomeScreen from './src/screens/HomeScreen';
// import Display from './src/screens/Display';
// import PlayerCards from './src/screens/PlayerCards';

import vGif from './assets/v_logo.gif';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}, cacheTime: 1000 * 60 * 60 * 24},
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const Stack = createStackNavigator();

function AppContainer() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
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
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistQueryClientProvider>
  );
}

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
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
