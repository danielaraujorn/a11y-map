import { createContext, ReactElement, useCallback, useState } from 'react';

import { UserType } from '../types/Models';

export const AuthContext = createContext<{
  user?: UserType;
  done: boolean;
  setUser?: (newValue?: UserType) => void;
}>({
  done: false,
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<UserType | undefined>();
  const [done, setDone] = useState<boolean>(false);

  const updateUser = useCallback(
    async (newValue?: UserType) => {
      setUser(newValue);
      setDone(true);
    },
    [setUser, setDone]
  );
  return (
    <AuthContext.Provider
      value={{
        user,
        done,
        setUser: updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
