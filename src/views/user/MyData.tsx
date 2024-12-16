import React from "react";
import { Avatar, Box, Circle, Heading, HStack, Icon, Stack, Text, useColorModeValue, View, VStack } from "native-base";
import { MyDataScreenNavigationProp, MyDataScreenRouteProp } from "../../types/navigation/user/user.type";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";
import { useAuth } from "../../contexts/Auth";

type Props = {
    route: MyDataScreenRouteProp;
    navigation: MyDataScreenNavigationProp;
  };

  
export const MyData = ({ route, navigation }: Props) => {

  const { authData } = useAuth();
  
  return (
    <View flex="1">
    <FocusAwareStatusBar  />
  <Stack
  marginTop="5"
  direction={{
    base: "column",
    md: "row",
  }}
  space="1"
  alignItems={{
    base: "center",
    md: "flex-start",
  }}
>
  <Avatar
    size="2xl"
    source={{
      uri: authData?.user.photo,
    }}
  >
    RB
  </Avatar>
  <VStack space="3" w="90%" marginTop="5">
    <ItemMenu label='Nome' title={authData?.user.name} />
    <ItemMenu label='Email' title={authData?.user.email} />
    <ItemMenu label='Localização' title={'Araraquara'} />
    <ItemMenu label='Telefone' title={'16988447655'} />
  </VStack>
</Stack>
</View>
  )
}

export const ItemMenu = ({ label, title}: any) => (
    <HStack justifyContent="space-between">
    <Text alignSelf="center">{label}</Text>
      <Text alignSelf="center">{title}</Text>
    </HStack>
);

