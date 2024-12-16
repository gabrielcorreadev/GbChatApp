import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountStackNavigator } from "./views/account/AccountStackNavigator";
import { SplashScreen } from "./components/SplashScreen";
import { useAuth } from "./contexts/Auth";
import HomeTabs from "./views/home/HomeTabs";
import { HomeStackParamList } from "./types/navigation/home/home-stack-param-list";
import { useColorModeValue } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootStack = createNativeStackNavigator<HomeStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Home" component={HomeTabs} />
    </RootStack.Navigator>
  );
}
  
export function AppNavigator() {

  const { authData, loading } = useAuth();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: useColorModeValue('white', 'black'),
    },
  };

  
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
    <NavigationContainer theme={MyTheme}>
      {authData ? (
        <RootStackNavigator />
      ) : (
        <AccountStackNavigator />
      )}
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

export function screenOptionHeader():any {
  return {
    headerStyle: {
      backgroundColor: useColorModeValue('white', 'black'),
    },
    headerTintColor: useColorModeValue('black', 'white'),
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}