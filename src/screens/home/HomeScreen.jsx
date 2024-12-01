import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '@components/common/Header';
import styles from './HomeScreen.style';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}></View>
    </SafeAreaView>
  );
};

export default HomeScreen;
