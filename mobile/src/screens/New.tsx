import React from 'react';
import { Text, VStack } from 'native-base';
import { Header } from '../components/Header';
import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function New() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Text
          color="white"
          fontFamily="heading"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa{'\n'}e compartilhe entre amigos!
        </Text>

        <Input mb={2} placeholder="Qual nome do seu bolão ?" />
        <Button title="Criar meu bolão" />

        <Text color="gray.200" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá{'\n'}um código único que poderá
          usar para{'\n'} convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
