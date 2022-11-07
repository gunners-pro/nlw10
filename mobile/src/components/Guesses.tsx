import { FlatList, useToast } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  const toast = useToast();

  const fetchGames = useCallback(async () => {
    try {
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
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
  }, [toast, poolId]);

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: 'Palpite realizado com sucesso',
        placement: 'top',
        bgColor: 'red.500',
      });

      fetchGames();
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response.data.message,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
    />
  );
}
