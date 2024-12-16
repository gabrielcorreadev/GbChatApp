import React, { useEffect } from "react"
import { Actionsheet, Button, Center, Heading, HStack, Icon, Image, Link, Spinner, Stack, Text, useColorModeValue, useDisclose, useToast, VStack } from "native-base";
import { deviceService } from "../../../services/settings/devices/device.services";
import { FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AxiosError } from "axios";
import { ConnectedDevicesScreenNavigationProp, ConnectedDevicesScreenRouteProp } from "../../../types/navigation/settings/settings.type";
import Moment from "react-moment";

type Props = {
  route: ConnectedDevicesScreenRouteProp;
  navigation: ConnectedDevicesScreenNavigationProp;
};

export default function ConnectedDevices({ route, navigation }: Props) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<Array<any>>([]);
  const [error, setError] = React.useState<any>(null);
  const [currentItem, setCurrentItem] = React.useState<any>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  
  useEffect(() => {
    loadData();
  }, [])

  const loadData = () => {
    setIsLoading(true);
    deviceService.list().then((response) => {
      console.log(response.data)
      setDataSource(response.data.data);
    }).catch((error: AxiosError) => {
      toast.show({
        title: (error.response?.data as AxiosError).message,
      })
      setError(error.response);
    }).then(() => {
      setIsLoading(false);
    })
  }

  const actionDevice = (item:any) => {
    if(item == null)
    {
      setCurrentItem(null); 
      onOpen();
    }
    if(!item?.current_device)
    {
      setCurrentItem(item); 
      onOpen();
    }
  }

  const disconnectDevice = () => {
    setIsLoadingButton(true);
    deviceService.logout(currentItem?.access_token_id).then((response) => {
      toast.show({
        title: response?.data.message,
      });
      onClose();
      loadData();
    }).catch((error: AxiosError) => {
      toast.show({
        title: (error.response?.data as AxiosError).message,
      })
    }).then(() => {
      setIsLoadingButton(false);
    })
  };

  const disconnectAllDevices = () => {
    setIsLoadingButton(true);
    deviceService.logout_all().then((response) => {
      toast.show({
        title: response?.data.message,
      });
      onClose();
      loadData();
    }).catch((error: AxiosError) => {
      toast.show({
        title: (error.response?.data as AxiosError).message,
      })
    }).then(() => {
      setIsLoadingButton(false);
    })
  };

  const renderRow = ({ item }: any) => {
    return (
      <Link onPress={ () => {actionDevice(item)}}>
      <HStack marginBottom={3} marginTop={3} flex={1} justifyContent="space-between">
        <HStack>
        <Icon as={<MaterialCommunityIcons name='cellphone-link' />} size="lg" marginRight={5} />
        <VStack>
        <Heading size="sm">{item?.name}</Heading>
        <Text fontSize="xs">{item?.localization}</Text>
        </VStack>
        </HStack>
        <HStack>
        {item.current_device ? <Text fontSize="sm" color={'success.500'}>Atual</Text> :
        <Icon as={<MaterialCommunityIcons name='dots-vertical' />} alignSelf="center" size={6} />
        }
        </HStack>
        
      </HStack>
      </Link>
    );
  };

  const RenderFlatlist = () => {
    return (
      <FlatList
        data={dataSource}
        renderItem={renderRow}
        ListEmptyComponent={NoDevicesFound}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  const ListDevices = () => {
    if (isLoading) {
      return (<Center flex={1}><Spinner size="lg" /></Center>);
    }
    else {
      return (<RenderFlatlist />);
    }
  }



  return (
    <Stack flex={1} padding={5}>
      {!isLoading ? <Heading size="sm" justifyContent={'center'} marginBottom={5}>Sua conta foi conectada nestes dispostivos</Heading> : null}
      <ListDevices />
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content padding={5}>
        <Heading size="sm">{currentItem ? currentItem?.name : 'Desconectar todos os dispositivos?'}</Heading>
        <Text fontSize="xs" maxWidth={350} marginTop={2} marginBottom={5}>{currentItem ?<Moment fromNow element={Text} >{currentItem?.created_at}</Moment> : 'Isso vai desconectar sua conta em todos os dispositivos, exceto o atual.' }</Text>
        <Button
            bg="primary.500"
            width="100%"
            startIcon={<Icon as={MaterialCommunityIcons} name="delete" size={5} />}
            isLoading={isLoadingButton} isLoadingText="Removendo"
            onPress={currentItem ? disconnectDevice : disconnectAllDevices}
          >{currentItem ? 'Desconectar Dispositivo' : 'Desconectar Todos Dispositivos'}</Button>
        </Actionsheet.Content>
      </Actionsheet>
      <HStack>
      <Button
            bg="primary.500"
            width="100%"
            startIcon={<Icon as={MaterialCommunityIcons} name="tablet-cellphone" size={5} />}
            onPress={() => {actionDevice(null)}}
          >Desconectar Todos Dispositivos</Button>
      </HStack>
    </Stack>
  )
}

function NoDevicesFound() {
  return (
    <Center flex={1}>
      <Image
        source={require('../../../assets/icons/letter_message.png')}
        alt="Alternate Text"
        size={"2xl"}
      />
      <Heading size="sm">Nenhum dispositivo encontrado</Heading>
    </Center>
  )
}