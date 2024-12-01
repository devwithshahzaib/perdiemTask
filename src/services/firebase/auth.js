import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {unregisterFCMToken} from '@services/notification';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId:
    '228353937526-8ogl00ihadekalati6h1n6feurrurhg0.apps.googleusercontent.com',
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    return userCredential.user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);

    if (error.code === 'SIGN_IN_CANCELLED') {
      throw new Error('Sign in was cancelled');
    } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
      throw new Error('Google Play Services is not available');
    } else if (error.code === 'SIGN_IN_REQUIRED') {
      throw new Error('Sign in is required');
    }

    throw error;
  }
};

export const signOut = async () => {
  try {
    await unregisterFCMToken();

    // First sign out from Firebase
    await auth().signOut();

    // Check if user is signed in with Google
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.signOut();
    }
  } catch (error) {
    console.error('Sign Out Error:', error);
    // Continue with sign out even if there's an error
  }
};
