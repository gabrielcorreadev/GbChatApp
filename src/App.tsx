// App.tsx
import React, { useEffect } from "react"
import { NativeBaseProvider, StorageManager, ColorMode } from 'native-base';
import { AppNavigator } from "./AppNavigator"
import { theme } from "./themes/dafault.theme";
import { AuthProvider } from "./contexts/Auth";
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from "react-moment";
import 'moment-timezone';
import { environment } from "./environments/environment.prod";

const moment = require('moment/min/moment-with-locales');

// Define the colorModeManager,
// here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', (value) as any);
    } catch (e) {
      console.log(e);
    }
  },
};

Moment.globalMoment = moment;
Moment.globalLocal = true;
Moment.globalLocale = 'pt-br';

const App = () => {
  
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(environment.ONESIGNALAPPID);
    return () => {
    };
  }, []);

  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
      <AuthProvider>
      <AppNavigator />
      </AuthProvider>
    </NativeBaseProvider>
  )
}

export default App