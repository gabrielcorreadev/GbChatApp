import { Button, Center, Container, Heading, Image, Stack, Text, useColorMode, VStack } from "native-base";
import React from "react";
import { AccountScreenNavigationProp, AccountScreenRouteProp } from "../../types/navigation/account/account.type";

type Props = {
    route: AccountScreenRouteProp;
    navigation: AccountScreenNavigationProp;
};

export default function Account({ route, navigation }: Props) {

    const { colorMode, toggleColorMode } = useColorMode();
    
    return <Center flex={1}>
        <Container>
        <Stack mx={5} mb="4" alignItems="center">
        <Image
        source={colorMode == 'dark' ? require('../../assets/app/logo.png') : require('../../assets/app/logo-dark.png') }
        borderRadius={10}
      size={'sm'}

      alt="Alternate Text"
    />
        </Stack>
        <Heading>
          Descubra seus amigos próximos
          </Heading>
          <Text mt="2" fontWeight="medium">
          Encontre todos os seus amigos em um só lugar
          </Text>
          <Stack mt="5">
          <Button variant="rounded" bg="primary.600" onPress={() => navigation.navigate('Login')}>Possui conta? Conecte-se</Button>
          </Stack>
          <Stack mt="3">
          <Button variant="rounded" bg="secondary.600" onPress={() => navigation.navigate('Signup')}>Junte-se a nós, é grátis</Button>
          </Stack>
        </Container>
      </Center>;
  }