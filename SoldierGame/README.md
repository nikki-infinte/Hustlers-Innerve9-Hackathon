# Project Name

# ShoryaPath: Offline Entertainment for Soldiers

## Project Overview

ShoryaPath is a lightweight React Native mobile application designed specifically for soldiers stationed in low network and internet connectivity areas. Our mission is to provide engaging, offline entertainment that supports the mental well-being and recreational needs of military personnel during challenging deployment conditions.

## Key Objectives

- **Offline Accessibility**: Fully functional without internet connection
- **Low Resource Consumption**: Optimized for performance on diverse mobile devices
- **Entertainment-Driven**: Engaging game experiences tailored for soldiers
- **Compact Design**: Minimal app size for easy installation and storage

## Core Value Proposition

In remote and challenging environments where internet connectivity is limited or non-existent, ShoryaPath delivers a reliable source of entertainment, helping soldiers maintain morale, reduce stress, and enjoy moments of leisure during their service.

## Prerequisites

- Node.js (version X.X.X)
- npm or Yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nikki-infinte/Hustlers-Innerve9-Hackathon.git
cd Hustlers-Innerve9-Hackathon/SoldierGame
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

### 3. Environment Setup

#### iOS Setup
```bash
# Install CocoaPods dependencies
bundle install
bundle exec pod install
```

#### Android Setup
Ensure you have the Android SDK and necessary build tools installed through Android Studio.

### 4. Running the Application

#### iOS
```bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

#### Android
```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

## Development Workflow

### Available Scripts

- `npm start` or `yarn start`: Starts the Metro bundler
- `npm run ios` or `yarn ios`: Runs the app on iOS simulator
- `npm run android` or `yarn android`: Runs the app on Android emulator
- `npm test` or `yarn test`: Runs test suite
- `npm run lint` or `yarn lint`: Runs linter

### Environment Variables

Create a `.env` file in the project root for environment-specific configurations:

```
API_URL=https://your-api-endpoint.com
DEBUG=true
```

## Project Structure

```
/your-project-name
├── __tests__/            # Unit and integration tests
├── android/              # Android native project
├── ios/                  # iOS native project
├── src/
│   ├── components/       # Reusable React components
│   ├── screens/          # Individual screen components
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API and external service integrations
│   ├── utils/            # Utility functions
│   └── store/            # State management (Redux/MobX)
├── assets/               # Static assets (images, fonts)
└── App.tsx               # Root application component
```

## Configuration

### Navigation
Uses React Navigation for handling app navigation.

### State Management
[Describe your state management approach - Redux, MobX, Context API]

### Styling
[Describe styling approach - StyleSheet, Styled Components, etc.]

## Testing

### Unit Tests
Run tests using:
```bash
npm test
```

## Deployment

### iOS
[Instructions for building and deploying to App Store]

### Android
[Instructions for generating signed APK/AAB and deploying to Google Play]

## Troubleshooting

- Ensure all dependencies are installed correctly
- Clear Metro bundler cache: `npx react-native start --reset-cache`
- Rebuild native modules: `npx react-native clean-project-auto`






