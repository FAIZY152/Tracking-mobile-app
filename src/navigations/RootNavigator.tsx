import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/home/Homescreen';
import StackNavigator from './stack/StackNavigation';

type RootStackParamList = {
  Home: undefined;
  StackNavigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const RootNavigator:React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StackNavigation" component={StackNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
} 

export default RootNavigator;