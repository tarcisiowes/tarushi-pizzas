import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import brandImage from '@assets/brand.png';
import {
  Brand, Container, Content, Title,
} from './styles';

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>
          <Brand source={brandImage} />
          <Title>Login</Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
          />
          <Button
            title="Entrar"
            type="secondary"
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
