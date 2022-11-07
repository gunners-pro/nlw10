import React, { useCallback, useEffect, useState } from 'react';
import { Share } from 'react-native';
import { HStack, useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';
import { PoolProps } from '../components/PoolCard';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { PoolHeader } from '../components/PoolHeader';
import { Option } from '../components/Option';

interface RouteParams {
  id: string;
}

type IOption = 'Seus palpites' | 'Ranking do grupo';

export function Details() {
  const [optionSelected, setOptionSelected] =
    useState<IOption>('Seus palpites');
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<PoolProps>({} as PoolProps);
  const route = useRoute();
  const toast = useToast();
  const { id } = route.params as RouteParams;

  const fetchPoolDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
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
  }, [id, toast]);

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [fetchPoolDetails]);

  if (isLoading) return <Loading />;

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {poolDetails._count.Participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />

          <HStack bg="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === 'Seus palpites'}
              onPress={() => setOptionSelected('Seus palpites')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === 'Ranking do grupo'}
              onPress={() => setOptionSelected('Ranking do grupo')}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
