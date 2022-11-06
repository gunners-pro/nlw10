import { Row, Text } from 'native-base';

export function EmptyPoolList() {
  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {'\n'} nenhum bolão, que tal{' '}
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          buscar um por código
        </Text>
        <Text color="white" fontSize="sm" textAlign="center" mx={1}>
          {' '}
          ou{' '}
        </Text>
        <Text textDecorationLine="underline" color="yellow.500">
          criar um novo
        </Text>
        <Text color="white" fontSize="sm" textAlign="center">
          ?
        </Text>
      </Text>
    </Row>
  );
}
