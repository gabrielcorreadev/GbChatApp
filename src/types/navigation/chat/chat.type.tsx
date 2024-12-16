import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChatStackParamList } from './chat-stack-param-list';

export type ChatScreenRouteProp = RouteProp<ChatStackParamList, 'Chat'>;

export type ChatScreenNavigationProp = StackNavigationProp<
ChatStackParamList,
  'Chat'
>;