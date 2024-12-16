import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import { AccountStackParamList } from "./types/account-stack-param-list";
import Signup from "./Signup";
import Account from "./Account";

const Stack = createNativeStackNavigator<AccountStackParamList>();

 export function AccountStackNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
  );
}