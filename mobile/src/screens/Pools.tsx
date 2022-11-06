import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { api } from '../services/api';
import { PoolProps, PoolCard } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';
import { Loading } from '../components/Loading';

export function Pools() {
  const { navigate } = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolProps[]>([]);

  const fetchPools = useCallback(async () => {
    try {
      const response = await api.get('/pools');
      setPools(response.data.pools);
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.message,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate('find')}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 150 }}
          ListEmptyComponent={<EmptyPoolList />}
        />
      )}
    </VStack>
  );
}
