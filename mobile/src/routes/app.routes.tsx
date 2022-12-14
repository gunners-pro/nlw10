import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Details } from '../screens/Details';
import { Find } from '../screens/Find';
import { New } from '../screens/New';
import { Pools } from '../screens/Pools';

const { Navigator, Screen } = createBottomTabNavigator();

interface IconProps {
  color: string;
  size: number;
  focused: boolean;
}

const IconPlus = (props: IconProps) => <PlusCircle {...props} />;

const IconSoccerBall = (props: IconProps) => <SoccerBall {...props} />;

export function AppRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontFamily: 'Roboto_500Medium',
        },
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: 87,
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: -10,
        },
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: IconPlus,
          tabBarLabel: 'Novo bolão',
        }}
      />
      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: IconSoccerBall,
          tabBarLabel: 'Meus bolões',
        }}
      />
      <Screen
        name="find"
        component={Find}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
