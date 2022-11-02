import React from 'react';
import { Center } from 'native-base';

import Logo from '../assets/logo.svg';

export function SignIn() {
  return (
    <Center bg="gray.900" flex={1}>
      <Logo width={212} height={40} />
    </Center>
  );
}
