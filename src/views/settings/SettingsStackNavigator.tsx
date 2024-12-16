import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsStackParamList } from "../../types/navigation/settings/settings-stack-param-list";
import { screenOptionHeader } from "../../AppNavigator";
import Settings  from "./Settings";
import DarkMode from "./dark-mode/DarkMode";
import ConnectedDevices from "./connected-devices/ConnectedDevices";

const Stack = createNativeStackNavigator<SettingsStackParamList>();

 export function SettingsStackNavigator() {
  return (
      <Stack.Navigator screenOptions={screenOptionHeader()}>
        <Stack.Screen name="SettingsList" component={Settings} options={{ title: 'Configurações' }} />
        <Stack.Screen name="DarkMode" component={DarkMode} options={{ title: 'Modo escuro' }} />
        <Stack.Screen name="ConnectedDevices" component={ConnectedDevices} options={{ title: 'Dispositivos conectados' }} />
      </Stack.Navigator>
  );
}