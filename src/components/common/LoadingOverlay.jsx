import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {COLORS} from '@constants/colors';
import styles from './LoadingOverlay.style';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default LoadingOverlay;
