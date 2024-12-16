import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from './settings-stack-param-list';

export type SettingsListScreenRouteProp = RouteProp<SettingsStackParamList, 'SettingsList'>;
export type DarkModeScreenRouteProp = RouteProp<SettingsStackParamList, 'DarkMode'>;
export type ArchivedChatScreenRouteProp = RouteProp<SettingsStackParamList, 'ArchivedChat'>;
export type NotificationsScreenRouteProp = RouteProp<SettingsStackParamList, 'Notifications'>;
export type BlockedUsersScreenRouteProp = RouteProp<SettingsStackParamList, 'BlockedUsers'>;
export type ConnectedDevicesScreenRouteProp = RouteProp<SettingsStackParamList, 'ConnectedDevices'>;
export type HelpScreenRouteProp = RouteProp<SettingsStackParamList, 'Help'>;

export type SettingsScreenNavigationProp = StackNavigationProp<
SettingsStackParamList,
  'SettingsList'
>;

export type DarkModeScreenNavigationProp = StackNavigationProp<
SettingsStackParamList,
  'DarkMode'
>;

export type ArchivedChatScreenNavigationProp = StackNavigationProp<
SettingsStackParamList,
  'ArchivedChat'
>;

export type NotificationsScreenNavigationProp = StackNavigationProp<
SettingsStackParamList,
  'Notifications'
>;

export type BlockedUsersScreenNavigationProp = StackNavigationProp<
SettingsStackParamList,
  'BlockedUsers'
>;

export type ConnectedDevicesScreenNavigationProp = StackNavigationProp<
SettingsStackParamList,
  'ConnectedDevices'
>;

export type HelpScreenNavigationProp = StackNavigationProp<
SettingsStackParamList,
  'Help'
>;