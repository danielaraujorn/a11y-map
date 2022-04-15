import { createContext, ReactElement, useCallback, useState } from 'react';

export const AuthContext = createContext<{
  logged: boolean;
  done: boolean;
  setLogged?: (logged: boolean) => void;
}>({
  logged: false,
  done: false,
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const updateLogged = useCallback(
    async (newValue: boolean) => {
      setLogged(newValue);
      setDone(true);
    },
    [setLogged, setDone]
  );
  return (
    <AuthContext.Provider
      value={{
        logged,
        done,
        setLogged: updateLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
