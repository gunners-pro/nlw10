import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/contexts/AuthContext';
import { New } from './src/screens/New';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>
        <StatusBar style="light" />
        {fontsLoaded ? <New /> : <Loading />}
      </AuthProvider>
    </NativeBaseProvider>
  );
}
