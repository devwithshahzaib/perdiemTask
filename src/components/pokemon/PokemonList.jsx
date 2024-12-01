import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getPokemonList} from '@services/api/pokemon';
import LoadingOverlay from '@components/common/LoadingOverlay';
import styles from './PokemonList.style';

const PokemonCard = ({item, onPress}) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
    <Image source={{uri: item.image}} style={styles.pokemonImage} />
    <Text style={styles.pokemonName}>{item.name}</Text>
    <View style={styles.typeContainer}>
      {item.types.map(type => (
        <Text key={type} style={styles.typeText}>
          {type}
        </Text>
      ))}
    </View>
  </TouchableOpacity>
);

const PokemonList = ({onPokemonPress}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: getPokemonList,
    getNextPageParam: lastPage => (lastPage.hasMore ? lastPage.nextPage : null),
  });

  if (isLoading) return <LoadingOverlay />;
  if (isError)
    return <Text style={styles.errorText}>Error loading Pokemon</Text>;

  const pokemonData = data.pages.flatMap(page => page.pokemon);

  return (
    <FlatList
      data={pokemonData}
      renderItem={({item}) => (
        <PokemonCard item={item} onPress={onPokemonPress} />
      )}
      keyExtractor={item => item.id.toString()}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <View style={styles.loadingContainer}>
            <LoadingOverlay size="small" />
          </View>
        ) : null
      }
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default PokemonList;
