import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
// import { GOOGLE_CLIENTE_ID } from 'react-native-dotenv';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface User {
  name: string;
  avatarUrl: string;
}

interface AuthContextDataProps {
  user: User;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthProvider({ children }) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [_request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '764625746035-7nur39f2fpb6ncrt991st2d8am7vfcr0.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  const signInWithGoogle = useCallback(async (access_token: string) => {
    try {
      setIsUserLoading(true);
      const { data } = await api.post('/users', { access_token });
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  const signIn = useCallback(async () => {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsUserLoading(false);
    }
  }, [promptAsync]);

  const contextData = useMemo<AuthContextDataProps>(
    () => ({
      signIn,
      user,
      isUserLoading,
    }),
    [isUserLoading, signIn, user]
  );

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response, signInWithGoogle]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
