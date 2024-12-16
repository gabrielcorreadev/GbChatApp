import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorModeValue } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as React from 'react';
import { theme } from '../../themes/dafault.theme';
import { UserStackNavigator } from '../user/UserStackNavigator';
import { ChatStackNavigator } from '../chat/ChatStackNavigator';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
<Tab.Navigator 

screenOptions={{headerShown:false, 
        tabBarActiveTintColor: theme.colors.primary[500], 
        tabBarStyle:{height:60, backgroundColor:useColorModeValue('white', 'black')}, 
        tabBarIconStyle:{
        fontSize:16,
      }, tabBarLabelStyle:{
        bottom:8,
        fontSize:16
      } }}>
      <Tab.Screen name="inicio" component={ChatStackNavigator}
        options={{
          headerTitle:'Inicío',
          tabBarLabel: 'Inicío',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen name="perfil" component={UserStackNavigator}
        options={{
          headerTitle:'Meu Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <MaterialCommunityIcons name={focused ? 'account-circle' : 'account-circle-outline'} size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}