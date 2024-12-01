import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {useAppDispatch} from '@store/hooks';
import {setLoggedIn, setUser} from '@store/slices/authSlice';
import {signInWithGoogle} from '@services/firebase/auth';
import googleIcon from '@assets/images/google-icon.png';
import LoadingOverlay from '@components/common/LoadingOverlay';
import {showError} from '@utils/alert';
import styles from './LoginScreen.style';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const user = await signInWithGoogle();

      dispatch(
        setUser({
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }),
      );
      dispatch(setLoggedIn(true));
    } catch (error) {
      showError(error, 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingOverlay />}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
        disabled={isLoading}>
        <Image source={googleIcon} style={styles.googleIcon} />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
