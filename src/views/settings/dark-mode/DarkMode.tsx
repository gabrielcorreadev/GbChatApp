import React from 'react';
import {
  Heading,
  useColorMode,
  Button,
  HStack,
  Radio,
  useColorModeValue,
} from 'native-base';
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar';

export default function DarkMode () {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <HStack flex={1} padding={5}>
          <FocusAwareStatusBar  />
              <Radio.Group
      name="myRadioGroup"
      accessibilityLabel="favorite number"
      value={useColorModeValue('light', 'dark')}
      onChange={(nextValue) => {
        toggleColorMode();
      }}
    >
      <Radio value="light" my={1}>
        Claro
      </Radio>
      <Radio value="dark" my={1}>
        Escuro
      </Radio>
    </Radio.Group>
        </HStack>
    );
  }