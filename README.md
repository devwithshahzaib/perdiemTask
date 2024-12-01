# Pokemon App with React Native

A React Native application that displays Pokemon information using the PokeAPI, featuring Google Sign-In, Push Notifications, and a modern UI with animations.
### Loom Explanation: 
[Watch Part 1 on Loom](https://www.loom.com/share/8bb7a3440ba94225b1c6c37c3817bcb0)


[Watch Part 2 on Loom](https://www.loom.com/share/a1c9c4645e004b0ebeb6153e484f0f8f)

## Features

### Authentication
- Google Sign-In integration using Firebase Authentication
- Persistent authentication state
- Proper sign-out handling with cleanup

### Pokemon List
- Paginated list of Pokemon using PokeAPI
- Infinite scroll with loading indicators
- Pull-to-refresh functionality
- Smooth animations for list items
- Error handling with retry options
- Two-column grid layout
- Caching for better performance

### Pokemon Details
- Detailed view of each Pokemon
- Animated stats bars
- Smooth transitions and loading states
- Error handling with retry options

### Push Notifications (Firebase Cloud Messaging)
- Handles notifications in all app states:
  - Foreground
  - Background
  - Quit/Closed
- Navigation to Pokemon details when notification is clicked
- Proper permission handling
- Token management (registration/unregistration)

### UI/UX Features
- Loading indicators for API calls
- Error handling with retry options
- Smooth animations
- Pull-to-refresh functionality
- Infinite scroll
- Responsive layout

## Technical Stack

- React Native
- Firebase (Authentication, Cloud Messaging)
- React Navigation
- Redux Toolkit (State Management)
- React Query (API Data Management)
- Axios (API Calls)

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-name]
```

2. Install dependencies:
```bash
yarn install
```

3. iOS Setup:
```bash
cd ios
pod install
cd ..
```

4. Firebase Setup:

- Create a new Firebase project
- Add Android & iOS apps
- Download and place configuration files:
  - Android: `google-services.json` in `android/app/`
  - iOS: `GoogleService-Info.plist` in `ios/perdiemTask/`
- Enable Authentication with Google Sign-In
- Enable Cloud Messaging

5. Update Google Sign-In configuration:
- Get Web Client ID from Firebase Console
- Update `webClientId` in `src/services/firebase/auth.js`

## Running the App

For iOS:

```bash
yarn ios
```

For Android:

```bash
yarn android
```

## Testing Push Notifications

1. Get FCM Token from app logs after login

2. Send test notification using Firebase Console:

```json
{
  "notification": {
    "title": "New Pokemon Found!",
    "body": "Check out this Pokemon!"
  },
  "data": {
    "pokemonId": "25"
  }
}
```

## Project Structure

```
src/
├── components/      # Reusable components
├── screens/         # Screen components
├── navigation/      # Navigation setup
├── services/        # API and Firebase services
├── store/           # Redux store
├── constants/       # App constants
└── utils/           # Utility functions
```

## Key Technologies

- React Native
- Firebase (Auth & FCM)
- React Navigation
- Redux Toolkit
- React Query
- Axios

## Development Notes

### Authentication Flow
- Uses Firebase Authentication with Google Sign-In
- Persists auth state using Redux Persist
- Handles token cleanup on logout

### Push Notifications
- Foreground: Shows alert with View/Cancel options
- Background/Closed: Opens Pokemon details on tap
- Handles permissions and token management

### Data Management
- Uses React Query for API data
- Implements infinite scroll
- Handles loading and error states
- Includes pull-to-refresh

## Troubleshooting

### Google Sign-In Issues
- Verify Firebase configuration
- Check `webClientId` in `auth.js`
- Verify SHA-1 in Firebase Console

### Push Notification Issues
- Check Android permissions
- Verify FCM setup
- Test using Firebase Console

## Scripts

```bash
yarn start     # Start Metro bundler
yarn ios       # Run on iOS
yarn android   # Run on Android
yarn lint      # Run linter
```
