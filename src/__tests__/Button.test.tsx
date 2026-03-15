import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Button } from '../../src/components/Button';
import theme from '../../src/theme';

jest.mock('react-native-gesture-handler', () => {
  const { TouchableOpacity } = require('react-native');
  return {
    RectButton: TouchableOpacity,
  };
});

const renderWithTheme = (component: React.ReactElement) => render(
  <ThemeProvider theme={theme}>
    {component}
  </ThemeProvider>,
);

describe('Button component', () => {
  it('should render the title text', () => {
    const { getByText } = renderWithTheme(
      <Button title="Entrar" />,
    );

    expect(getByText('Entrar')).toBeTruthy();
  });

  it('should render loading indicator when isLoading is true', () => {
    const { queryByText, getByTestId } = renderWithTheme(
      <Button title="Entrar" isLoading testID="button-loading" />,
    );

    expect(queryByText('Entrar')).toBeNull();
  });

  it('should render title when isLoading is false', () => {
    const { getByText } = renderWithTheme(
      <Button title="Salvar" isLoading={false} />,
    );

    expect(getByText('Salvar')).toBeTruthy();
  });

  it('should render with primary type by default', () => {
    const { getByText } = renderWithTheme(
      <Button title="Primary" />,
    );

    expect(getByText('Primary')).toBeTruthy();
  });

  it('should render with secondary type', () => {
    const { getByText } = renderWithTheme(
      <Button title="Secondary" type="secondary" />,
    );

    expect(getByText('Secondary')).toBeTruthy();
  });
});
