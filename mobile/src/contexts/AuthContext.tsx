import { createContext, useMemo } from 'react';

interface User {
  name: string;
  avatarUrl: string;
}

interface AuthContextDataProps {
  user: User;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthProvider({ children }) {
  async function signIn() {
    // todo
  }

  const contextData = useMemo<AuthContextDataProps>(
    () => ({
      signIn,
      user: { name: 'Fabricyo', avatarUrl: '' },
    }),
    []
  );

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
