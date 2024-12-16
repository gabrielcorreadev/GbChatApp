import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ExploreStackParamList } from './explore-stack-param-list';

export type PeopleNearbyScreenRouteProp = RouteProp<ExploreStackParamList, 'PeopleNearby'>;
export type ProfileScreenRouteProp = RouteProp<ExploreStackParamList, 'Profile'>;

export type PeopleNearbyScreenNavigationProp = StackNavigationProp<
ExploreStackParamList,
  'PeopleNearby'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
ExploreStackParamList,
  'Profile'
>;