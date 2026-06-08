import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Homescreen';
import ProductsPage from '../screens/home/ProfileScreen';


const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>

      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Products"
        component={ProductsPage}
        options={{
          headerShown:false
        }}
      />

    </Tab.Navigator>
  );
};

export default MainTabs;