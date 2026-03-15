# Tarushi Pizzas

A mobile application for a pizza shop, built with **React Native** and **Expo**. The app provides user authentication via **Firebase Auth** with local session persistence through **AsyncStorage**, and user profile lookup from **Firestore**.

## Features

- **Email & password login** — Authentication via Firebase Authentication
- **Session persistence** — User data stored locally with AsyncStorage
- **Profile lookup** — Fetches user data (name, admin permission) from Firestore
- **Access control** — `isAdmin` flag to differentiate regular users from administrators
- **Login screen** — Gradient interface with custom fonts (DM Sans, DM Serif Display)
- **Reusable components** — `Button` and `Input` with style variants (primary/secondary)

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Expo SDK 45 / React Native 0.68 |
| **Language** | TypeScript 4.3 |
| **UI/Styling** | styled-components 5.3 (native) |
| **Authentication** | Firebase Auth (@react-native-firebase/auth) |
| **Database** | Cloud Firestore (@react-native-firebase/firestore) |
| **Local storage** | @react-native-async-storage/async-storage |
| **Fonts** | @expo-google-fonts (DM Sans, DM Serif Display) |
| **Navigation** | Not implemented (login screen only) |
| **Animations** | react-native-reanimated 2.8 |
| **Gestures** | react-native-gesture-handler 2.2 |
| **Linting** | ESLint (Airbnb + TypeScript) |

## Project Structure

```
tarushi-pizzas/
├── App.tsx                          # Entry point - providers and font loading
├── src/
│   ├── @types/
│   │   └── png.d.ts                 # Type declaration for PNG image imports
│   ├── assets/
│   │   ├── brand.png                # Brand logo (with @2x and @3x variants)
│   │   └── happy.png                # Decorative image (with @2x and @3x variants)
│   ├── components/
│   │   ├── Button/
│   │   │   ├── index.tsx            # Button component with loading state
│   │   │   └── styles.ts           # Button styles (primary/secondary)
│   │   └── Input/
│   │       ├── index.tsx            # Custom input component
│   │       └── styles.ts           # Input styles (primary/secondary)
│   ├── hooks/
│   │   └── auth.tsx                 # Authentication context (Firebase + AsyncStorage)
│   ├── screens/
│   │   └── SignIn/
│   │       ├── index.tsx            # Login screen
│   │       └── styles.ts           # Login screen styles (gradient)
│   └── theme/
│       ├── index.ts                 # Theme definition (colors, fonts)
│       └── styled.d.ts             # Theme typing for styled-components
├── assets/                          # Default Expo assets (icons, splash)
├── app.json                         # Expo configuration
├── babel.config.js                  # Babel configuration (aliases, reanimated)
├── tsconfig.json                    # TypeScript configuration (paths)
└── .eslintrc.json                   # ESLint configuration
```

## Prerequisites

- **Node.js** >= 16
- **Yarn** or **npm**
- **Expo CLI** (`npm install -g expo-cli`)
- Firebase project configured with:
  - Authentication (Email/Password enabled)
  - Cloud Firestore (`users` collection with `name` and `isAdmin` fields)
- Firebase configuration files:
  - Android: `android/app/google-services.json`
  - iOS: `ios/GoogleService-Info.plist`

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd tarushi-pizzas

# Install dependencies
yarn install

# Start the app
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios
```

## Firebase Setup

1. Create a project on the [Firebase Console](https://console.firebase.google.com/)
2. Enable **Email/Password** under Authentication > Sign-in method
3. Create the `users` collection in Firestore with the following structure:
   ```json
   {
     "name": "User Name",
     "isAdmin": true
   }
   ```
4. Download the configuration files and place them in the native directories

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Starts the Expo development server |
| `yarn android` | Runs on Android emulator/device |
| `yarn ios` | Runs on iOS simulator/device |
| `yarn web` | Runs the web version |
| `yarn test` | Runs tests with Jest |
| `yarn test:watch` | Runs tests in watch mode |
| `yarn test:coverage` | Runs tests with coverage report |
| `yarn lint` | Runs ESLint on TypeScript files |

## License

This is a private project with no public license.
