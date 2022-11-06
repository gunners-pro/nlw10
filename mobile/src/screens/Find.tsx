import React, { useState } from 'react';
import { Text, useToast, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    setIsLoading(true);
    try {
      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post('/pools/join', { code });
      toast.show({
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      });
      navigate('pools');
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data?.message === 'Pool not found.') {
        return toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      if (error.response?.data?.message === 'You already joined this pool') {
        return toast.show({
          title: 'Você ja está nesse bolão',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      return toast.show({
        title: 'Error',
        description: error.message,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

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

        <Input
          mb={2}
          placeholder="Qual o código do bolão ?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button
          title="buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
