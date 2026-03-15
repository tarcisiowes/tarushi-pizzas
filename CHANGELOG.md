# Changelog - Tarushi Pizzas

## Data da Análise: 15 de Março de 2026

---

## O que foi feito

### 1. Documentação

- **README.md criado** — Documentação completa com descrição do projeto, tech stack, estrutura de pastas, pré-requisitos, instruções de instalação e configuração do Firebase.

### 2. Correções de Bugs

| Arquivo | Problema | Correção |
|---------|----------|----------|
| `src/hooks/auth.tsx` | Import errado de AsyncStorage (`@react-native-async/async-storage`) | Corrigido para `@react-native-async-storage/async-storage` |
| `src/hooks/auth.tsx` | `profile.data()` acessado antes de verificar `profile.exists` — podia causar crash em dados nulos | Invertida a ordem: verifica `exists` antes de acessar `data()` |
| `src/components/Button/index.tsx` | Prop `enable` (inexistente) passada ao RectButton | Corrigido para `enabled` (prop correta) |
| `src/screens/SignIn/index.tsx` | Uso de `onChange` nos inputs (não é prop válida de TextInput) | Corrigido para `onChangeText` |
| `src/components/Input/styles.ts` | Faltavam ponto-e-vírgulas nas propriedades CSS dentro do template literal | Adicionados os `;` faltantes |
| `src/components/Button/styles.ts` | Faltava ponto-e-vírgula na propriedade `font-family` | Adicionado `;` |

### 3. Melhorias de Código e Lógica

| Mudança | Descrição |
|---------|-----------|
| **signIn refatorado para async/await** | Substituiu `.then().catch()` aninhados (callback hell) por `try/catch` com `async/await`, melhorando legibilidade e tratamento de erros |
| **Adicionado `signOut`** | Funcionalidade de logout que limpa AsyncStorage e estado do Firebase — faltava completamente |
| **Error handling em `loadUserStorageData`** | Adicionado `try/catch` com fallback para limpar dados corrompidos do AsyncStorage |
| **Validação do `useAuth` hook** | Hook agora lança erro se usado fora do `AuthProvider`, evitando bugs silenciosos |
| **`expo-app-loading` removido** | Substituído por `expo-splash-screen` (API atual) — `AppLoading` era deprecado |
| **`react-native-iphone-x-helper` removido** | Lib descontinuada — padding refatorado para usar valores estáticos |
| **`react-native-firebase` v5 removido** | Pacote legacy duplicado (já existiam `@react-native-firebase/auth` e `/firestore`) |
| **`yarn` removido das dependencies** | Gerenciador de pacotes não deve ser listado como dependência do projeto |
| **`useCallback` no `loadUserStorageData`** | Evita recriação desnecessária da função a cada render |

### 4. Melhorias de Tipagem

| Mudança | Descrição |
|---------|-----------|
| **`noImplicitAny: false` removido** | `tsconfig.json` agora mantém `strict: true` completo, sem enfraquecer a checagem de tipos |
| **Theme tipado com `as const`** | Cores e fontes agora são tipos literais, dando autocomplete e type safety ao usar `theme.COLORS.PRIMARY_900` |
| **`ThemeType` exportado** | Tipo do tema disponível para uso externo, substituindo `typeof theme` redundante |
| **`styled.d.ts` corrigido** | Module augmentation agora usa `styled-components/native` (correto para RN) em vez de `styled-components` |
| **Tipo `User` exportado** | Permite reutilização do tipo em outros arquivos e nos testes |
| **Tipagem de erros do Firebase** | `catch (error: unknown)` com cast seguro em vez de tipagem direta no parâmetro |
| **`AuthContext` tipado como `undefined`** | Default do context é `undefined` ao invés de `{} as AuthContextData`, evitando acesso a propriedades inexistentes |

### 5. Testes Adicionados

| Arquivo | Cobertura |
|---------|-----------|
| `src/__tests__/auth.test.tsx` | 9 testes — signIn (sucesso, credenciais inválidas, campos vazios, perfil inexistente, erro genérico), signOut, carregamento do AsyncStorage, dados corrompidos, uso fora do provider |
| `src/__tests__/Button.test.tsx` | 5 testes — renderização do título, loading state, tipos primary/secondary |
| `src/__tests__/Input.test.tsx` | 5 testes — placeholder, tipos primary/secondary, secureTextEntry, autoCapitalize |
| `src/__tests__/SignIn.test.tsx` | 6 testes — renderização de elementos da UI, interação com inputs, chamada do signIn |
| `src/__tests__/theme.test.ts` | 5 testes — tokens de cor, tokens de fonte, validação de formato hex, gradiente |

### 6. Configuração de Testes

- Adicionados `jest`, `jest-expo`, `@testing-library/react-native`, `@testing-library/jest-native` e `react-test-renderer` ao `devDependencies`
- Configuração do Jest no `package.json` com `transformIgnorePatterns` e `moduleNameMapper` para aliases
- Scripts `test`, `test:watch` e `test:coverage` adicionados

---

## O que pode ser feito para se tornar um produto atual

### Prioridade Alta (Essencial)

| Item | Descrição |
|------|-----------|
| **Atualizar Expo SDK para 52+** | SDK 45 está muito desatualizado (3+ anos). A migração traz React 18, React Native 0.76+, e melhorias de performance significativas. Seguir o [guia de upgrade do Expo](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/). |
| **Atualizar React para 18.x** | Concurrent features, automatic batching, e hooks novos (`useId`, `useSyncExternalStore`). |
| **Atualizar TypeScript para 5.x** | Suporte a `satisfies`, `const` type parameters, decorators nativos, performance de build. |
| **Atualizar Firebase para v21+** | Versão 14.x está muito atrás. Atualizações de segurança e novas APIs. |
| **Implementar navegação** | Usar `@react-navigation/native` v6+ com stack navigator. O app atualmente só tem a tela de Login. Necessário: Home, detalhes de pizza, carrinho, perfil. |
| **Adicionar tela de cadastro** | Registro de novos usuários com Firebase Auth `createUserWithEmailAndPassword`. |
| **Implementar "Esqueci minha senha"** | O botão existe mas não tem funcionalidade. Usar `auth().sendPasswordResetEmail()`. |
| **Configuração de ambiente** | Criar `.env` com variáveis sensíveis e `.env.example` como template. Usar `expo-constants` ou `react-native-dotenv`. |

### Prioridade Média (Importante)

| Item | Descrição |
|------|-----------|
| **Migrar para Expo Router** | Substituir react-navigation pelo Expo Router (file-based routing), padrão atual do Expo SDK 50+. |
| **Adicionar `react-native-safe-area-context`** | Substituição moderna do `react-native-iphone-x-helper` para lidar com safe areas (notch, barra de status, etc). |
| **Validação de formulários** | Usar `react-hook-form` + `zod` para validação de email, senha (mínimo de caracteres, formato). |
| **Catálogo de pizzas** | Tela principal com listagem de pizzas do Firestore (imagem, nome, preço, descrição). |
| **Sistema de pedidos** | Carrinho de compras, seleção de tamanho, sabores, e finalização de pedido. |
| **Painel administrativo** | Telas para admins: cadastro de pizzas, gerenciamento de pedidos, controle de status. |
| **Notificações push** | Firebase Cloud Messaging para notificar sobre status do pedido. |
| **Migrar styled-components para Nativewind/Tamagui** | `styled-components` para RN tem performance inferior. Alternativas modernas: NativeWind (Tailwind para RN) ou Tamagui. |
| **Adicionar Prettier** | Formatação consistente de código junto com ESLint. |
| **CI/CD** | GitHub Actions para rodar testes, lint, e build automaticamente em cada PR. |

### Prioridade Baixa (Bom ter)

| Item | Descrição |
|------|-----------|
| **Skeleton loading** | Telas de carregamento com skeleton placeholders ao invés de spinners. |
| **Animações de transição** | Usar `react-native-reanimated` (já instalado) para animar transições de telas e interações. |
| **Dark mode** | Suporte a tema escuro usando o sistema de temas já existente. |
| **Internacionalização (i18n)** | Suporte a múltiplos idiomas com `react-i18next` ou `expo-localization`. |
| **Testes E2E** | Usar Detox ou Maestro para testes end-to-end automatizados. |
| **Storybook** | Catálogo visual de componentes para desenvolvimento isolado. |
| **Error boundary** | Componente React para capturar erros de renderização e mostrar fallback. |
| **Analytics** | Firebase Analytics para métricas de uso (telas mais visitadas, ações mais frequentes). |
| **App Store / Play Store** | Usar EAS Build para gerar builds de produção e submeter às lojas. |
| **Acessibilidade** | Adicionar `accessibilityLabel`, `accessibilityRole` e testar com leitores de tela. |

---

## Resumo Técnico

O projeto está em estágio inicial (MVP com tela de login). A base de código é sólida em termos de organização (aliases, theme, components), mas sofre de dependências muito desatualizadas e funcionalidades incompletas. As correções aplicadas nesta revisão resolvem bugs reais que impediriam o funcionamento correto do app, e as melhorias de tipagem e lógica tornam o código mais robusto e manutenível. O próximo passo mais crítico é a atualização do Expo SDK e a implementação das telas de negócio (catálogo, pedidos, admin).
