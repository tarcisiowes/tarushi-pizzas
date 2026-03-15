import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { SignIn } from '../../src/screens/SignIn';
import theme from '../../src/theme';

const mockSignIn = jest.fn();

jest.mock('../../src/hooks/auth', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    isLogging: false,
    user: null,
  }),
}));

jest.mock('react-native-gesture-handler', () => {
  const { TouchableOpacity } = require('react-native');
  return {
    RectButton: TouchableOpacity,
  };
});

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});

jest.mock('../../src/assets/brand.png', () => 'brand-image');

const renderWithTheme = (component: React.ReactElement) => render(
  <ThemeProvider theme={theme}>
    {component}
  </ThemeProvider>,
);

describe('SignIn screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Login title', () => {
    const { getByText } = renderWithTheme(<SignIn />);

    expect(getByText('Login')).toBeTruthy();
  });

  it('should render email and password inputs', () => {
    const { getByPlaceholderText } = renderWithTheme(<SignIn />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });

  it('should render the Entrar button', () => {
    const { getByText } = renderWithTheme(<SignIn />);

    expect(getByText('Entrar')).toBeTruthy();
  });

  it('should render forgot password link', () => {
    const { getByText } = renderWithTheme(<SignIn />);

    expect(getByText('Esqueci minha senha')).toBeTruthy();
  });

  it('should call signIn when Entrar button is pressed', () => {
    const { getByText, getByPlaceholderText } = renderWithTheme(<SignIn />);

    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');

    fireEvent.changeText(emailInput, 'user@test.com');
    fireEvent.changeText(passwordInput, '123456');
    fireEvent.press(getByText('Entrar'));

    expect(mockSignIn).toHaveBeenCalledWith('user@test.com', '123456');
  });

  it('should call signIn with empty strings if inputs are not filled', () => {
    const { getByText } = renderWithTheme(<SignIn />);

    fireEvent.press(getByText('Entrar'));

    expect(mockSignIn).toHaveBeenCalledWith('', '');
  });
});
