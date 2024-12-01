import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {toggleButton} from '@store/slices/homeSlice';
import Header from '@components/common/Header';
import PokemonList from '@components/pokemon/PokemonList';
import styles from './HomeScreen.style';

const ActionButton = ({title, isActive, onPress}) => (
  <TouchableOpacity
    style={[styles.actionButton, isActive && styles.actionButtonActive]}
    onPress={onPress}>
    <Text
      style={[
        styles.actionButtonText,
        isActive && styles.actionButtonTextActive,
      ]}
      numberOfLines={1}
      ellipsizeMode="tail">
      {title}
    </Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const buttons = useAppSelector(state => state.home.buttons);

  const handlePokemonPress = pokemon => {
    navigation.navigate('Details', {pokemon});
  };

  const handleButtonPress = buttonKey => {
    dispatch(toggleButton(buttonKey));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.buttonContainer}>
        <ActionButton
          title="Catch Pokemon"
          isActive={buttons.catch}
          onPress={() => handleButtonPress('catch')}
        />
        <ActionButton
          title="View Team"
          isActive={buttons.team}
          onPress={() => handleButtonPress('team')}
        />
        <ActionButton
          title="Settings"
          isActive={buttons.settings}
          onPress={() => handleButtonPress('settings')}
        />
      </View>
      <PokemonList onPokemonPress={handlePokemonPress} />
    </SafeAreaView>
  );
};

export default HomeScreen;
