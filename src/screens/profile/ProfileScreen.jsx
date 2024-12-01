import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {logout} from '@store/slices/authSlice';
import {signOut} from '@services/firebase/auth';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '@components/common/LoadingOverlay';
import {showAlert, showError} from '@utils/alert';
import styles from './ProfileScreen.style';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {user} = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    showAlert({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await signOut();
              dispatch(logout());
            } catch (error) {
              showError(error, 'Failed to logout');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoadingOverlay />}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={isLoading}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={
            user?.photoURL
              ? {uri: user.photoURL}
              : require('@assets/images/default-avatar.png')
          }
        />
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={isLoading}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
