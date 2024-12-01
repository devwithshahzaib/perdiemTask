import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getPokemonList} from '@services/api/pokemon';
import LoadingOverlay from '@components/common/LoadingOverlay';
import ErrorView from '@components/common/ErrorView';
import {COLORS} from '@constants/colors';
import styles from './PokemonList.style';

const PokemonCard = React.memo(({item, onPress, index, animatedItems}) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!animatedItems.current.has(item.id)) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
        delay: 200,
      }).start(() => {
        animatedItems.current.add(item.id);
      });
    } else {
      scaleAnim.setValue(1); // Instantly set to final value if already animated
    }
  }, []);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [
            {
              scale: scaleAnim,
            },
          ],
        },
      ]}>
      <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
        <Image
          source={{uri: item.image}}
          style={styles.pokemonImage}
          loading="eager"
        />
        <Text style={styles.pokemonName}>{item.name}</Text>
        <View style={styles.typeContainer}>
          {item.types.map(type => (
            <Text key={type} style={styles.typeText}>
              {type}
            </Text>
          ))}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const PokemonList = ({onPokemonPress}) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const animatedItems = React.useRef(new Set());

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: getPokemonList,
    getNextPageParam: lastPage => (lastPage.hasMore ? lastPage.nextPage : null),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
  });

  const handleRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    animatedItems.current.clear(); // Clear animated items to re-animate after refresh
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const handleEndReached = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  if (isLoading) return <LoadingOverlay />;
  if (isError)
    return (
      <ErrorView
        message={error?.message || 'Error loading Pokemon'}
        onRetry={refetch}
      />
    );

  const pokemonData = data.pages.flatMap(page => page.pokemon);

  return (
    <FlatList
      data={pokemonData}
      renderItem={({item, index}) => (
        <PokemonCard
          item={item}
          onPress={onPokemonPress}
          index={index}
          animatedItems={animatedItems}
        />
      )}
      keyExtractor={item => item.id.toString()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.8}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <View style={styles.loadingContainer}>
            <LoadingOverlay size="small" />
          </View>
        ) : null
      }
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      initialNumToRender={6}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={COLORS.primary}
          colors={[COLORS.primary]} // Android
          progressBackgroundColor={COLORS.background} // Android
          progressViewOffset={10} // Android
        />
      }
    />
  );
};

export default PokemonList;
