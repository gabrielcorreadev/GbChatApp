import * as React from 'react';
import {
  Input,
  Stack,
  FormControl,
  Center,
  Button,
  Icon,
  Image,
  Select,
  CheckIcon,
  useToast,
  useColorMode,
  useColorModeValue,
  Heading
} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { authenticationService } from '../../services/account/authentication.service';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { SessionData } from '../../types/system/session-data';
import { useAuth } from '../../contexts/Auth';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Platform } from 'react-native';
import useLocation from '../../hooks/useLocation';

type FormData = {
  name: string;
  login: string;
  password: string;
  password_confirmation: string;
};


export default function Signup({ navigation }:any) {

  const [isCancelled, setIsCancelled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const auth = useAuth();
  const toast = useToast();
  const { coords, errorMsg } = useLocation();	    //utilizando o hook que vai nos fornecer a posição do usuário.

  useEffect(() => {
    return () => (setIsCancelled(true))
  }, [])
  

  const onSubmit = (data:FormData) => {
    const device_name = Platform.OS === 'ios' ? `${Platform.OS} - ${Platform.Version}`: `${Platform.OS} - ${(Platform.constants as any).Model}`;

    const dataSend = {
      name: data.name,
      email: data.login,
      password: data.password,
      password_confirmation: data.password_confirmation,
      device_name: device_name,
      latitude: coords.latitude.toString(),
      longitude: coords.longitude.toString(),
  }

    setLoading(true);
    authenticationService.signup(dataSend).then((response: AxiosResponse) => {
      handleSignup(response.data.data);
    }).catch((error: AxiosError) => {
      toast.show({
        title: (error.response?.data as AxiosError).message,
      })
    }).then(() => {
      setLoading(false);
    })
  };

  const handleSignup = async (dadosSessao:SessionData) => {
    setLoading(true);
    
    Alert.alert(
      'Confirmação de conta',
      'Se esse email pertence a você. Confirme o email enviado para ' + dadosSessao.user.email,
      [
        { text: 'Ok', onPress: () => navigation.navigate('Login') },
      ],
      { cancelable: false }
    )
  }

  return (
    <Center flex="1">
      <FocusAwareStatusBar barStyle={useColorModeValue('dark-content', 'light-content')} backgroundColor={useColorModeValue('white', 'black')} />
        <FormControl>
        <Stack mx="5" mb="2">
        <Heading size="2xl">
          Criar sua conta
          </Heading>
        </Stack>
        </FormControl>
        <FormControl isRequired isInvalid={'name' in errors}>
        <Stack mx="5" marginTop="3">
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <Input
              onBlur={onBlur}
              placeholder="Nome"
              InputLeftElement={<Icon as={<MaterialCommunityIcons name="account-outline" />} size="5" ml="2" color="muted.400" />}
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              variant="rounded"
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="name"
          rules={{ required: 'Campo é obrigatório', minLength: 3 }}
          defaultValue=""
        />
          <FormControl.ErrorMessage>
          {errors?.name?.message}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={'login' in errors}>
        <Stack mx="5" marginTop="3">
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <Input
              onBlur={onBlur}
              placeholder="Email"
              InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-outline" />} size="5" ml="2" color="muted.400" />}
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              variant="rounded"
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="login"
          rules={{ required: 'Campo é obrigatório', minLength: 3 }}
          defaultValue=""
        />
          <FormControl.ErrorMessage>
          {errors?.login?.message}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={'password' in errors}>
        <Stack mx="5" marginTop="3">
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <Input
              type="password"
              onBlur={onBlur}
              variant="rounded"
              placeholder="Senha"
              InputLeftElement={<Icon as={<MaterialCommunityIcons name="lock-outline" />} size="5" ml="2" color="muted.400" />}
                   _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: 'Campo é obrigatório', minLength: 3 }}
          defaultValue=""
        />
          <FormControl.ErrorMessage>
          {errors?.password?.message}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={'password_confirmation' in errors}>
        <Stack mx="5" marginTop="3">
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <Input
              type="password"
              onBlur={onBlur}
              variant="rounded"
              placeholder="Confirmar Senha"
              InputLeftElement={<Icon as={<MaterialCommunityIcons name="lock-outline" />} size="5" ml="2" color="muted.400" />}
                   _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="password_confirmation"
          rules={{ required: 'Campo é obrigatório', minLength: 3 }}
          defaultValue=""
        />
          <FormControl.ErrorMessage>
          {errors?.password_confirmation?.message}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <FormControl isRequired>
        <Stack mx="5" marginTop="6">
          <Button
            bg="primary.900"
            variant="rounded"
            isLoading={loading} isLoadingText="Criando"
            startIcon={<Icon as={MaterialCommunityIcons} name="account-plus-outline" size='md' />}
            onPress={handleSubmit(onSubmit)}
          >Cadastre-se agora</Button>
        </Stack>
      </FormControl>
      <FormControl isRequired>
        <Stack mx="5" marginTop="2">
          <Button
            bg="secondary.600"
            variant="rounded"
            startIcon={<Icon as={MaterialCommunityIcons} name="login" size='md' />}
            onPress={() => navigation.navigate('Login')}
          >Acessar sua conta</Button>
        </Stack>
      </FormControl>
    </Center>
  );
}