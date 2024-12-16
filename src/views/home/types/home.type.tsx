import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from './home-stack-param-list';

export type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>;

export type HomeScreenNavigationProp = StackNavigationProp<
HomeStackParamList,
  'Home'
>;