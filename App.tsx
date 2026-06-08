import React from 'react';

import {
  useColorScheme,
} from 'react-native';

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import RootNavigator from './src/navigations/RootNavigator';

enableScreens();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>

      <NavigationContainer
        theme={isDarkMode ? DarkTheme : DefaultTheme}
      >
        <RootNavigator/>
      </NavigationContainer>

    </SafeAreaProvider>
  );
}

export default App;