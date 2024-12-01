import axios from 'axios';

const FIREBASE_SERVER_KEY = 'YOUR_SERVER_KEY'; // Get this from Firebase Console

export const sendTestNotification = async (token, pokemonId) => {
  if (!token) {
    console.error('FCM token is required');
    return;
  }

  try {
    const response = await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        to: token,
        notification: {
          title: 'New Pokemon Found!',
          body: `Check out Pokemon #${pokemonId}`,
          android_channel_id: 'default',
        },
        data: {
          pokemonId: pokemonId.toString(),
        },
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
            priority: 'high',
            default_vibrate_timings: true,
            default_sound: true,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${FIREBASE_SERVER_KEY}`,
        },
      },
    );

    console.log('Notification sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error sending notification:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
