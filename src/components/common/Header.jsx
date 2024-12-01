import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@store/hooks';
import styles from './Header.style';

const Header = () => {
  const navigation = useNavigation();
  const {user} = useAppSelector(state => state.auth);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.welcomeText}>
          Welcome back, {user?.displayName?.split(' ')[0]}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            style={styles.profileImage}
            source={
              user?.photoURL
                ? {uri: user.photoURL}
                : require('@assets/images/default-avatar.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
