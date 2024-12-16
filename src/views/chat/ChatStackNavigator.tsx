import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatStackParamList } from "../../types/navigation/chat/chat-stack-param-list";

import  Chat  from "./Chat";
import { screenOptionHeader } from "../../AppNavigator";

const Stack = createNativeStackNavigator<ChatStackParamList>();

 export function ChatStackNavigator() {
  return (
      <Stack.Navigator screenOptions={screenOptionHeader()}>
        <Stack.Screen name="Chat" component={Chat} options={{ title: 'Conversas' }} />
      </Stack.Navigator>
  );
}