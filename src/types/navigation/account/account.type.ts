import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountStackParamList } from './account-stack-param-list';

export type AccountScreenRouteProp = RouteProp<AccountStackParamList, 'Account'>;
export type LoginScreenRouteProp = RouteProp<AccountStackParamList, 'Login'>;
export type SignupScreenRouteProp = RouteProp<AccountStackParamList, 'Signup'>;

export type AccountScreenNavigationProp = StackNavigationProp<
AccountStackParamList,
  'Account'
>;

export type LoginScreenNavigationProp = StackNavigationProp<
AccountStackParamList,
  'Login'
>;

export type SignupScreenNavigationProp = StackNavigationProp<
AccountStackParamList,
  'Signup'
>;