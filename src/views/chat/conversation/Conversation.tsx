import React, { useEffect } from "react"
import { Button, Center, Heading, HStack, Image, Spinner, Stack, Text, useToast } from "native-base";
import { conversationService } from "../../../services/chat/conversation.service";
import { Alert, FlatList } from "react-native";
import { AxiosError } from "axios";
import io from "socket.io-client";

const socket = io("http://192.168.0.101:3000");

export default function Conversation() {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [dataSource, setDataSource] = React.useState<Array<any>>([]);
    const [error, setError] = React.useState<any>(null);
    const toast = useToast();
    

    useEffect(() => {
      socket.on('connection', () => console.log('[IO] Connect => A new connection has been established'))

      socket.on("chat.message", (msg:any) => {
        Alert.alert(msg)
        console.log(msg)
        setDataSource([...dataSource, msg]);
    });
      }, [])
      
      const loadSocket = () => {
      }

      const sendMessage = (text: string) => {
        Alert.alert(text)
        console.log('teste gabriel')
        socket.emit('chat.message', text);
      }

      
    const loadData = () => {
        setIsLoading(true);
        conversationService.list().then((response) => {
          console.log(response.data.items)
          setDataSource(response.data);
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
        return (<Text>teste</Text>);
      };

      const RenderFlatlist = () => {
        return (
          <HStack>
          <Button
                bg="primary.500"
                width="100%"
                onPress={() => {sendMessage('tesste')}}
              >Desconectar Todos Dispositivos</Button>
          </HStack>
        );
      }
      
      const ListChat = () => {
        if (isLoading) {
          return (<Spinner size="lg" />);
        }
        else {
          return (<RenderFlatlist />);
        }
      }


  return (
<Stack flex="1">
  <ListChat />
    </Stack>
  )
}

function NoMessagesFound() {
    return (
    <Center flex="1">
    <Image
      source={require('../../../assets/icons/letter_message.png')}
      alt="Alternate Text"
      size={"2xl"}
    />
    <Heading size="sm">Nenhuma mensagem encontrada</Heading>  
    </Center>
    )
  }