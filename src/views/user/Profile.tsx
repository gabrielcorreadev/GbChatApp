import React, { useEffect } from "react";
import { AspectRatio, Avatar, Box, Button, Center, Circle, Heading, HStack, Icon, Image, Stack, Text, useColorModeValue, useToast, View, VStack, ZStack } from "native-base";
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from "../../types/navigation/user/user.type";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../contexts/Auth";
import { userService } from "../../services/users/user.service";
import { AxiosError } from "axios";
import { TranslucentStatusBar } from "../../components/TranslucentStatusBar";

type Props = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
  };

  
export const Profile = ({ route, navigation }: Props) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);
  const { userId } = route.params;
  const toast = useToast();
  const { authData } = useAuth();
  
  useEffect(() => {
    if(userId == authData?.user.id)
    {
      setDataSource(authData.user);
    }
    else
    {
      loadData();
    }
  }, [])

  const loadData = () => {
    setIsLoading(true);
    userService.getById(userId).then((response) => {
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

  return (
    <View flex={1}>
    <TranslucentStatusBar  />
    <Box bg="gray.300" width="full">
    <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" />
          </AspectRatio>
    </Box>
  <Box
  marginTop="5"
  w="100%"
>
    <Center>
  <Avatar
    size="xl"
    backgroundColor="white"
    source={{
      uri: dataSource?.photo,
    }}
  >
    RB
  </Avatar>
  <Heading marginTop="3" size="md">{dataSource?.name}</Heading>
  </Center>
</Box>
</View>
  )
}

const ActionButtons = () => {
  return <Stack direction={{
    base: "column",
    md: "row"
  }} space={4}>
      <Button leftIcon={<Icon as={MaterialCommunityIcons} name="cloud-upload-outline" size="sm" />}>
        Upload
      </Button>
      <Button variant="subtle" endIcon={<Icon as={MaterialCommunityIcons} name="cloud-download-outline" size="sm" />}>
        Download
      </Button>
    </Stack>;
};
