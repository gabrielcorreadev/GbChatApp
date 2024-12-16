import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { UserStackParamList } from "../../types/navigation/user/user-stack-param-list";

import { screenOptionHeader } from "../../AppNavigator";
import User from "./User";
import { MyData } from "./MyData";
import { SettingsStackNavigator } from "../settings/SettingsStackNavigator";
import { Profile } from "./Profile";

const Stack = createNativeStackNavigator<UserStackParamList>();

function getHeaderTitle(route:any) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'User';
  
    switch (routeName) {
      case 'User':
        return 'Meu Perfil';
      case 'MyData':
        return 'Meus dados';
    }
  }

 export function UserStackNavigator() {
  return (
      <Stack.Navigator screenOptions={screenOptionHeader()}>
        <Stack.Screen name="User" component={User} options={{ title: 'Meu Perfil' }} />
        <Stack.Screen name="Profile" component={Profile}  options={{ title: 'Perfil' }} />
        <Stack.Screen name="MyData" component={MyData} options={{ title: 'Meus dados' }} />
        <Stack.Screen name="Settings" component={SettingsStackNavigator} options={{ headerShown:false}} />
      </Stack.Navigator>
  );
}