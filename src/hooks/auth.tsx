import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLogging: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = '@tarushi-pizzas:users';

const AuthContext = createContext<AuthContextData | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const loadUserStorageData = useCallback(async () => {
    setIsLogging(true);
    try {
      const storedUser = await AsyncStorage.getItem(USER_COLLECTION);
      if (storedUser) {
        const userData = JSON.parse(storedUser) as User;
        setUser(userData);
      }
    } catch {
      await AsyncStorage.removeItem(USER_COLLECTION);
    } finally {
      setIsLogging(false);
    }
  }, []);

  useEffect(() => {
    loadUserStorageData();
  }, [loadUserStorageData]);

  async function signIn(email: string, password: string): Promise<void> {
    if (!email || !password) {
      Alert.alert('Login', 'Informe o e-mail e senha.');
      return;
    }

    setIsLogging(true);

    try {
      const account = await auth().signInWithEmailAndPassword(email, password);

      const profile = await firestore()
        .collection('users')
        .doc(account.user.uid)
        .get();

      if (!profile.exists) {
        Alert.alert('Login', 'Perfil de usuário não encontrado.');
        return;
      }

      const data = profile.data() as Omit<User, 'id'>;
      const userData: User = {
        id: account.user.uid,
        name: data.name,
        isAdmin: data.isAdmin,
      };

      await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
      setUser(userData);
    } catch (error: unknown) {
      const firebaseError = error as { code?: string };

      if (
        firebaseError.code === 'auth/user-not-found'
        || firebaseError.code === 'auth/wrong-password'
        || firebaseError.code === 'auth/invalid-credential'
      ) {
        Alert.alert('Login', 'E-mail e/ou senha inválida.');
        return;
      }

      Alert.alert('Login', 'Não foi possível realizar o login.');
    } finally {
      setIsLogging(false);
    }
  }

  async function signOut(): Promise<void> {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem(USER_COLLECTION);
      setUser(null);
    } catch {
      Alert.alert('Sair', 'Não foi possível sair da conta.');
    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      isLogging,
      user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
