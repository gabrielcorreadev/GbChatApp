import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from './user-stack-param-list';

export type UserScreenRouteProp = RouteProp<UserStackParamList, 'User'>;
export type ProfileScreenRouteProp = RouteProp<UserStackParamList, 'Profile'>;
export type MyDataScreenRouteProp = RouteProp<UserStackParamList, 'MyData'>;
export type SettingsScreenRouteProp = RouteProp<UserStackParamList, 'Settings'>;

export type UserScreenNavigationProp = StackNavigationProp<
UserStackParamList,
  'User'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
UserStackParamList,
  'Profile'
>;

export type MyDataScreenNavigationProp = StackNavigationProp<
UserStackParamList,
  'MyData'
>;

export type SettingsScreenNavigationProp = StackNavigationProp<
UserStackParamList,
  'Settings'
>;