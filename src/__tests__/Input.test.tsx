import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Input } from '../../src/components/Input';
import theme from '../../src/theme';

const renderWithTheme = (component: React.ReactElement) => render(
  <ThemeProvider theme={theme}>
    {component}
  </ThemeProvider>,
);

describe('Input component', () => {
  it('should render with placeholder text', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render with primary type by default', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Nome" />,
    );

    expect(getByPlaceholderText('Nome')).toBeTruthy();
  });

  it('should render with secondary type', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Senha" type="secondary" />,
    );

    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });

  it('should pass secureTextEntry prop', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Senha" secureTextEntry />,
    );

    const input = getByPlaceholderText('Senha');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('should pass autoCapitalize prop', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="E-mail" autoCapitalize="none" />,
    );

    const input = getByPlaceholderText('E-mail');
    expect(input.props.autoCapitalize).toBe('none');
  });
});
