import React from "react";
import { Avatar, Circle, Heading, HStack, Icon, Link, Stack, Switch, Text, useColorModeValue, View, VStack } from "native-base";
import { SettingsScreenNavigationProp, SettingsListScreenRouteProp } from "../../types/navigation/settings/settings.type";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Alert } from "react-native";
import { useAuth } from "../../contexts/Auth";
import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";

type Props = {
  route: SettingsListScreenRouteProp;
  navigation: SettingsScreenNavigationProp;
};


export default function Settings({ route, navigation }: Props) {

  const { authData } = useAuth();

  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };

  return (
    <View flex={1}>
      <FocusAwareStatusBar />
      <Stack
        marginTop={5}
        direction={{
          base: "column",
          md: "row",
        }}
        space={1}
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
        <Heading size="md">{authData?.user.name}</Heading>
        <VStack space={3} w="90%">
          <ItemMenu title="Modo escuro" icon="weather-night" bg="gray.700" onPress={() => navigation.navigate('DarkMode')} />
          <ItemMenu title="Conversas arquivadas" bg="purple.700" icon="archive" onPress={() => navigation.navigate('DarkMode')} />
          <ItemMenu title="Notificações" icon="bell" bg="teal.700" onPress={() => navigation.navigate('DarkMode')} />
          <ItemMenu title="Bloqueados" icon="cancel" bg="orange.700" onPress={() => navigation.navigate('DarkMode')} />
          <ItemMenu title="Seus dispositivos" icon="cellphone-link" bg="success.700" onPress={() => navigation.navigate('ConnectedDevices')} />
          <ItemMenu title="Ajuda" icon="help-circle" bg="blue.700" onPress={() => navigation.navigate('DarkMode')} />
          <ItemMenu title="Sair" icon="logout" bg="primary.700" onPress={() => Alert.alert(
            'Conta',
            'Você tem certeza que deseja sair?',
            [
              { text: 'Cancelar', onPress: () => console.log('Cancel Pressed!') },
              { text: 'Sair', onPress: () => signOut() },
            ],
            { cancelable: false }
          )} />
        </VStack>
      </Stack>
    </View>
  );
}

export const ItemMenu = ({ icon, title, onPress, bg }: any) => (
  <Link onPress={onPress}>
    <HStack>
      <Circle size={42} bg={bg} marginRight={5}>
        <Icon as={<MaterialCommunityIcons name={icon} />} color={'white'} size={6} />
      </Circle>
      <Text alignSelf="center">{title}</Text>
    </HStack>
  </Link>
);
