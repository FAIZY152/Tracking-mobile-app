import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        children={(props) => (
          <LoginScreen
            {...props}
            onNavigateToSignUp={() => props.navigation.navigate('Signup')}
            onLoginSuccess={() => Alert.alert('Logged in successfully')}
          />
        )}
      />

      <Stack.Screen
        name="Signup"
        children={(props) => (
          <SignupScreen
            {...props}
            onNavigateToLogin={() => props.navigation.navigate('Login')}
            onSignupSuccess={() => Alert.alert('Account created successfully')}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;