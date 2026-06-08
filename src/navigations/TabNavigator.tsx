import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../screens/HomeStack";
import SearchStack from "../screens/SearchStack";
import ProfileStack from "../screens/ProfileStack";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}