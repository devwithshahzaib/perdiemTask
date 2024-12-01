import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getPokemonById} from '@services/api/pokemon';
import LoadingOverlay from '@components/common/LoadingOverlay';
import styles from './DetailsScreen.style';

const StatBar = ({label, value, maxValue = 100}) => {
  const percentage = (value / maxValue) * 100;
  return (
    <View style={styles.statContainer}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarContainer}>
        <View style={[styles.statBar, {width: `${percentage}%`}]} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
};

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {pokemon} = route.params;

  const {data, isLoading, isError} = useQuery({
    queryKey: ['pokemon', pokemon.id],
    queryFn: () => getPokemonById(pokemon.id),
  });

  if (isLoading) return <LoadingOverlay />;
  if (isError)
    return <Text style={styles.errorText}>Error loading Pokemon</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{uri: data.image}} style={styles.pokemonImage} />
        </View>

        <Text style={styles.name}>{data.name}</Text>

        <View style={styles.typesContainer}>
          {data.types.map(type => (
            <View key={type} style={styles.typeChip}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{data.height / 10}m</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{data.weight / 10}kg</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Base Stats</Text>
          {data.stats.map(stat => (
            <StatBar
              key={stat.stat.name}
              label={stat.stat.name}
              value={stat.base_stat}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
