import { AlertDialog, Avatar, Heading, HStack, Icon, Link, Pressable, Stack, Text, useColorModeValue, View, VStack } from 'native-base';
import * as React from 'react';
import { useAuth } from '../../contexts/Auth';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Alert } from 'react-native';
import { UserScreenNavigationProp, UserScreenRouteProp } from '../../types/navigation/user/user.type';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';

type Props = {
  route: UserScreenRouteProp;
  navigation: UserScreenNavigationProp;
};

export default function User({ route, navigation }: Props) {

  const { authData } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const auth = useAuth();
  const signOut = () => {
    setIsOpen(!isOpen);
    auth.signOut();
  };

  return (
    <View flex={1}>
      <FocusAwareStatusBar  />
      <Stack
        padding={8}
        direction={{
          base: "column",
          md: "row",
        }}
        space={1}
        alignItems={{
          base: "flex-start",
          md: "flex-start",
        }}
      >
        <Pressable onPress={() => navigation.navigate('Profile', {userId: authData?.user.id as any})}>
        <HStack alignItems="center" marginBottom={3}>
        <Avatar
          bg="lightBlue.400"
          source={{
            uri: authData?.user.photo,
          }}
        >
          RB
          <Avatar.Badge bg="green.500" />
        </Avatar>
        <Heading size="sm" marginLeft={2}>{authData?.user.name}</Heading>
        </HStack>
        </Pressable>
        <VStack space={3} w="90%">
          <ItemMenu title="Meus dados" icon="card-account-details-outline" onPress={() => navigation.navigate('MyData')} />
          <ItemMenu title="Ajuda" icon="help-circle-outline" />
          <ItemMenu title="Sobre" icon="book-information-variant" />
          <ItemMenu title="Configurações" icon="cog-outline" onPress={() => navigation.navigate('Settings')} />
          <ItemMenu title="Sair" icon="logout" onPress={() => Alert.alert(
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

export const ItemMenu = ({ icon, title, onPress }: any) => (
  <Link onPress={onPress}>
    <HStack>
      <Icon as={<MaterialCommunityIcons name={icon} />} marginRight={5} />
      <Text alignSelf="center">{title}</Text>
    </HStack>
  </Link>
);