import React, { useEffect } from "react"
import { Center, Heading, HStack, Icon, Image, Link, Spinner, Stack, Text, useToast, VStack } from "native-base";
import { userService } from "../../../services/users/user.service";
import { FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AxiosError } from "axios";
import { PeopleNearbyScreenNavigationProp, PeopleNearbyScreenRouteProp } from "../../../types/navigation/explore/explore.type";
import useLocation from "../../../hooks/useLocation";

type Props = {
  route: PeopleNearbyScreenRouteProp;
  navigation: PeopleNearbyScreenNavigationProp;
};

export const params = {
    lat: '',
    lng: '',
    range: '15'
};

export default function PeopleNearby({ route, navigation }: Props) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<Array<any>>([]);
  const { coords, errorMsg } = useLocation();	
  const [error, setError] = React.useState<any>(null);
  const toast = useToast();
  
  useEffect(() => {
    loadData();
  }, [])

  const loadData = () => {

    setIsLoading(true);

    params.lat = coords.latitude.toString();
    params.lat = coords.longitude.toString();

    userService.nearbyLocation(params).then((response) => {
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


  const renderRow = ({ item }: any) => {
    return (
      <Link onPress={ () => navigation.navigate('Profile', { userId: item.id })}>
      <HStack marginBottom={3} marginTop={3} flex={1} justifyContent="space-between">
        <HStack>
        <Icon as={<MaterialCommunityIcons name='cellphone-link' />} size="lg" marginRight={5} />
        <VStack>
        <Heading size="sm">{item?.name}</Heading>
        <Text fontSize="xs">{item?.localization}</Text>
        </VStack>
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
        ListEmptyComponent={NoDataFound}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  const ListData = () => {
    if (isLoading) {
      return (<Center flex={1}><Spinner size="lg" /></Center>);
    }
    else {
      return (<RenderFlatlist />);
    }
  }



  return (
    <Stack flex={1} padding={5}>
      {!isLoading ? <Heading size="sm" justifyContent={'center'} marginBottom={5}>Pessoas Perto</Heading> : null}
      <ListData />
    </Stack>
  )
}

function NoDataFound() {
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