import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {navigationRef} from '@navigation/RootNavigation';
import {APP_NAVIGATION} from '@constants/navigation.constants';

export const requestUserPermission = async () => {
  try {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return permission === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

const handleNotification = async remoteMessage => {
  try {
    console.log('Handling notification:', remoteMessage);
    const pokemonId = remoteMessage?.data?.pokemonId;

    if (pokemonId) {
      // Store navigation intent regardless of navigation state
      global.pendingNotificationNavigation = {
        screen: APP_NAVIGATION.DETAILS,
        params: {pokemon: {id: pokemonId}},
      };

      // Try to navigate if possible
      if (navigationRef.current?.isReady()) {
        navigationRef.current.navigate(APP_NAVIGATION.DETAILS, {
          pokemon: {id: pokemonId},
        });
      }
    }
  } catch (error) {
    console.error('Error handling notification:', error);
  }
};

export const setupNotifications = () => {
  try {
    // Background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Message:', remoteMessage);
      await handleNotification(remoteMessage);
    });

    // Foreground message handler
    const messageUnsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'New Pokemon',
        remoteMessage.notification?.body,
        [
          {
            text: 'View',
            onPress: () => handleNotification(remoteMessage),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    });

    // Handle notification open when app is in background/quit
    const notificationUnsubscribe =
      messaging().onNotificationOpenedApp(handleNotification);

    // Check if app was opened from a notification when app was quit
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNotification(remoteMessage);
        }
      });

    // Request permissions (will be handled by the native module)
    requestUserPermission();
    getFCMToken();

    // Return cleanup function
    return () => {
      messageUnsubscribe();
      notificationUnsubscribe();
    };
  } catch (error) {
    console.error('Error setting up notifications:', error);
    return () => {}; // Return empty cleanup function if setup fails
  }
};

export const unregisterFCMToken = async () => {
  try {
    await messaging().deleteToken();
    console.log('FCM Token deleted successfully');
  } catch (error) {
    console.error('Error deleting FCM token:', error);
  }
};
