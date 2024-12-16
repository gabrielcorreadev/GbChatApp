import * as React from 'react';
import { StatusBar, useColorModeValue } from 'native-base';

export function FocusAwareStatusBar(props:any) {

  return <StatusBar barStyle={useColorModeValue('dark-content', 'light-content')} backgroundColor={useColorModeValue('white', 'black')} />;
}