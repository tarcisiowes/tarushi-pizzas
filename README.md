# Tarushi Pizzas

Aplicativo mobile para uma pizzaria, construído com **React Native** e **Expo**. O app oferece autenticação de usuários via **Firebase Auth** com persistência de sessão local via **AsyncStorage**, e consulta de perfil de usuário no **Firestore**.

## Funcionalidades

- **Login com e-mail e senha** — Autenticação via Firebase Authentication
- **Persistência de sessão** — Dados do usuário salvos localmente com AsyncStorage
- **Consulta de perfil** — Busca dados do usuário (nome, permissão admin) no Firestore
- **Controle de acesso** — Flag `isAdmin` para diferenciar usuários comuns de administradores
- **Tela de login** — Interface com gradiente, fontes customizadas (DM Sans, DM Serif Display)
- **Componentes reutilizáveis** — `Button` e `Input` com variantes de estilo (primary/secondary)

## Tech Stack

| Camada | Tecnologia |
|--------|------------|
| **Framework** | Expo SDK 45 / React Native 0.68 |
| **Linguagem** | TypeScript 4.3 |
| **UI/Estilização** | styled-components 5.3 (native) |
| **Autenticação** | Firebase Auth (@react-native-firebase/auth) |
| **Banco de dados** | Cloud Firestore (@react-native-firebase/firestore) |
| **Armazenamento local** | @react-native-async-storage/async-storage |
| **Fontes** | @expo-google-fonts (DM Sans, DM Serif Display) |
| **Navegação** | Não implementada (apenas tela de login) |
| **Animações** | react-native-reanimated 2.8 |
| **Gestos** | react-native-gesture-handler 2.2 |
| **Linting** | ESLint (Airbnb + TypeScript) |

## Estrutura do Projeto

```
tarushi-pizzas/
├── App.tsx                          # Ponto de entrada - providers e carregamento de fontes
├── src/
│   ├── @types/
│   │   └── png.d.ts                 # Declaração de tipo para importação de imagens PNG
│   ├── assets/
│   │   ├── brand.png                # Logo da marca (com variantes @2x e @3x)
│   │   └── happy.png                # Imagem decorativa (com variantes @2x e @3x)
│   ├── components/
│   │   ├── Button/
│   │   │   ├── index.tsx            # Componente de botão com loading state
│   │   │   └── styles.ts           # Estilos do botão (primary/secondary)
│   │   └── Input/
│   │       ├── index.tsx            # Componente de input customizado
│   │       └── styles.ts           # Estilos do input (primary/secondary)
│   ├── hooks/
│   │   └── auth.tsx                 # Context de autenticação (Firebase + AsyncStorage)
│   ├── screens/
│   │   └── SignIn/
│   │       ├── index.tsx            # Tela de login
│   │       └── styles.ts           # Estilos da tela de login (gradiente)
│   └── theme/
│       ├── index.ts                 # Definição do tema (cores, fontes)
│       └── styled.d.ts             # Tipagem do tema para styled-components
├── assets/                          # Assets padrão do Expo (ícones, splash)
├── app.json                         # Configuração do Expo
├── babel.config.js                  # Configuração do Babel (aliases, reanimated)
├── tsconfig.json                    # Configuração do TypeScript (paths)
└── .eslintrc.json                   # Configuração do ESLint
```

## Pré-requisitos

- **Node.js** >= 16
- **Yarn** ou **npm**
- **Expo CLI** (`npm install -g expo-cli`)
- Projeto Firebase configurado com:
  - Authentication (Email/Password habilitado)
  - Cloud Firestore (coleção `users` com campos `name` e `isAdmin`)
- Arquivos de configuração Firebase:
  - Android: `android/app/google-services.json`
  - iOS: `ios/GoogleService-Info.plist`

## Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd tarushi-pizzas

# Instalar dependências
yarn install

# Iniciar o app
yarn start

# Rodar no Android
yarn android

# Rodar no iOS
yarn ios
```

## Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative **Email/Password** em Authentication > Sign-in method
3. Crie a coleção `users` no Firestore com a estrutura:
   ```json
   {
     "name": "Nome do Usuário",
     "isAdmin": true
   }
   ```
4. Baixe os arquivos de configuração e coloque nos diretórios nativos

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `yarn start` | Inicia o servidor de desenvolvimento Expo |
| `yarn android` | Inicia no emulador/dispositivo Android |
| `yarn ios` | Inicia no simulador/dispositivo iOS |
| `yarn web` | Inicia versão web |
| `yarn test` | Executa os testes com Jest |

## Licença

Este projeto é privado e não possui licença pública.
