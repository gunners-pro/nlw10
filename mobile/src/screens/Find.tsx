import React from 'react';
import { Text, VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Find() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Text
          color="white"
          fontFamily="heading"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{'\n'}seu código único
        </Text>

        <Input mb={2} placeholder="Qual o código do bolão ?" />
        <Button title="buscar bolão" />
      </VStack>
    </VStack>
  );
}
