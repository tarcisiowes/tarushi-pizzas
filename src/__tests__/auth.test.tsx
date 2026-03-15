import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { AuthProvider, useAuth, User } from '../../src/hooks/auth';

jest.mock('@react-native-firebase/auth', () => {
  const signInWithEmailAndPassword = jest.fn();
  const signOut = jest.fn();
  return {
    __esModule: true,
    default: () => ({
      signInWithEmailAndPassword,
      signOut,
    }),
  };
});

jest.mock('@react-native-firebase/firestore', () => {
  const get = jest.fn();
  const doc = jest.fn(() => ({ get }));
  const collection = jest.fn(() => ({ doc }));
  return {
    __esModule: true,
    default: () => ({ collection }),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  it('should start with user as null and isLogging as false', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    expect(result.current.user).toBeNull();
    expect(result.current.isLogging).toBe(false);
  });

  it('should load user from AsyncStorage on mount', async () => {
    const storedUser: User = { id: '123', name: 'John', isAdmin: false };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(storedUser),
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    expect(result.current.user).toEqual(storedUser);
    expect(result.current.isLogging).toBe(false);
  });

  it('should show alert when email or password is empty', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    await act(async () => {
      await result.current.signIn('', '');
    });

    expect(Alert.alert).toHaveBeenCalledWith('Login', 'Informe o e-mail e senha.');
  });

  it('should sign in successfully with valid credentials', async () => {
    const mockUser = { uid: 'user-123' };
    const mockProfile = {
      exists: true,
      data: () => ({ name: 'Maria', isAdmin: true }),
    };

    (auth().signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });
    (firestore().collection('users').doc as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockProfile),
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    await act(async () => {
      await result.current.signIn('maria@email.com', '123456');
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@tarushi-pizzas:users',
      JSON.stringify({ id: 'user-123', name: 'Maria', isAdmin: true }),
    );
    expect(result.current.user).toEqual({
      id: 'user-123',
      name: 'Maria',
      isAdmin: true,
    });
  });

  it('should show alert for invalid credentials', async () => {
    (auth().signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: 'auth/wrong-password',
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    await act(async () => {
      await result.current.signIn('maria@email.com', 'wrong');
    });

    expect(Alert.alert).toHaveBeenCalledWith('Login', 'E-mail e/ou senha inválida.');
  });

  it('should show generic alert for unknown errors', async () => {
    (auth().signInWithEmailAndPassword as jest.Mock).mockRejectedValue({
      code: 'auth/network-request-failed',
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    await act(async () => {
      await result.current.signIn('maria@email.com', '123456');
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Login',
      'Não foi possível realizar o login.',
    );
  });

  it('should sign out and clear storage', async () => {
    const storedUser: User = { id: '123', name: 'John', isAdmin: false };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(storedUser),
    );
    (auth().signOut as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    expect(result.current.user).toEqual(storedUser);

    await act(async () => {
      await result.current.signOut();
    });

    expect(auth().signOut).toHaveBeenCalled();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@tarushi-pizzas:users');
    expect(result.current.user).toBeNull();
  });

  it('should handle corrupted AsyncStorage data gracefully', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
      new Error('Storage error'),
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    expect(result.current.user).toBeNull();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@tarushi-pizzas:users');
  });

  it('should show alert when profile does not exist', async () => {
    const mockUser = { uid: 'user-456' };
    const mockProfile = {
      exists: false,
      data: () => null,
    };

    (auth().signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });
    (firestore().collection('users').doc as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockProfile),
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {});

    await act(async () => {
      await result.current.signIn('user@email.com', '123456');
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Login',
      'Perfil de usuário não encontrado.',
    );
  });
});

describe('useAuth outside provider', () => {
  it('should throw error when used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');
  });
});
