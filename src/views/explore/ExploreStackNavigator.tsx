import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreStackParamList } from "../../types/navigation/explore/explore-stack-param-list";

import { screenOptionHeader } from "../../AppNavigator";
import { Profile } from "../user/Profile";
import PeopleNearby from "./people-nearby/PeopleNearby";

const Stack = createNativeStackNavigator<ExploreStackParamList>();


 export function ExploreStackNavigator() {
  return (
      <Stack.Navigator screenOptions={screenOptionHeader()}>
        <Stack.Screen name="PeopleNearby" component={PeopleNearby} options={{ title: 'Pessoas Perto' }} />
        <Stack.Screen name="Profile" component={Profile}  options={{ title: 'Perfil' }} />
      </Stack.Navigator>
  );
}