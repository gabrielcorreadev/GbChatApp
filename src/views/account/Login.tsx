import * as React from 'react';
import {
  Input,
  Stack,
  FormControl,
  Center,
  Button,
  Icon,
  Image,
  useToast,
  useColorMode,
  useColorModeValue
} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { authenticationService } from '../../services/account/authentication.service';
import { useEffect } from 'react';
import { Credentials } from '../../types/system/credentials';
import { AxiosError, AxiosResponse } from 'axios';
import { SessionData } from '../../types/system/session-data';
import { useAuth } from '../../contexts/Auth';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import OneSignal from 'react-native-onesignal';
import { useForm, Controller } from 'react-hook-form';
import { Platform } from 'react-native';
import useLocation from '../../hooks/useLocation';

type FormData = {
  login: string;
  password: string;
};


export default function Login({ navigation }:any) {

  const [isCancelled, setIsCancelled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<any>(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const auth = useAuth();
  const toast = useToast();
  const { coords, errorMsg } = useLocation();	    //utilizando o hook que vai nos fornecer a posição do usuário.

  useEffect(() => {
    getDeviceUserId();
    return () => (setIsCancelled(true))
  }, [])

  const getDeviceUserId = async () =>
  {
    try {
      const data = await OneSignal.getDeviceState();
      if(data !== null) {
        setUserId(data.userId);
      }
    } catch(e) {
      // error reading value
    }
  } 

  const onSubmit = (data:FormData) => {

    const player_id = userId || '';

    const device_name = Platform.OS === 'ios' ? `${Platform.OS} - ${Platform.Version}`: `${Platform.OS} - ${(Platform.constants as any).Model}`;
    const credenciais = new Credentials(data.login, data.password, player_id, device_name, coords.latitude.toString(), coords.longitude.toString());
    console.log(credenciais)
    setLoading(true);
    authenticationService.login(credenciais).then((response: AxiosResponse) => {
      handleLogin(response.data.data);
    }).catch((error: AxiosError) => {
      toast.show({
        title: (error.response?.data as AxiosError).message,
      })
    }).then(() => {
      setLoading(false);
    })
  };

  const handleLogin = async (dadosSessao:SessionData) => {
    setLoading(true);
    console.log(dadosSessao)
    await auth.signIn(dadosSessao);

    toast.show({
      title: `Bem vindo(a), ${dadosSessao.user.name}`,
    });
  }

  return (
    <Center flex="1">
      <FocusAwareStatusBar barStyle={useColorModeValue('dark-content', 'light-content')} backgroundColor={useColorModeValue('white', 'black')} />
      <FormControl>
        <Stack mx="5" alignItems="center">
        <Image
        source={colorMode == 'dark' ? require('../../assets/app/logo.png') : require('../../assets/app/logo-dark.png') }
        borderRadius="10"
      size={'sm'}

      alt="Alternate Text"
    />
        </Stack>
        </FormControl>
      <FormControl isRequired isInvalid={'login' in errors}>
        <Stack mx="5" marginTop="5">
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <Input
              onBlur={onBlur}
              placeholder="Email"
              InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-outline" />} size={5} ml="2" color="muted.400" />}
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
      <FormControl isRequired>
        <Stack mx="5" marginTop="5">
          <Button
            bg="primary.900"
            variant="rounded"
            isLoading={loading} isLoadingText="Entrando"
            startIcon={<Icon as={MaterialCommunityIcons} name="login" size='md' />}
            onPress={handleSubmit(onSubmit)}
          >Acessar sua conta</Button>
        </Stack>
      </FormControl>
    </Center>
  );
}