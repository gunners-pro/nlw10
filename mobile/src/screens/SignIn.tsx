import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';

import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';

export function SignIn() {
  return (
    <Center bg="gray.900" flex={1} p={7}>
      <Logo width={212} height={40} />
      <Button
        title="Entrar com google"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
        mt={12}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além{'\n'}do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
}
