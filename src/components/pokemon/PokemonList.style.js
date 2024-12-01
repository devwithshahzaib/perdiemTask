import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '@constants/colors';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  cardContainer: {
    width: '50%',
    padding: 8,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    padding: 16,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    textTransform: 'capitalize',
    marginTop: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    marginTop: 4,
  },
  typeText: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.7,
    textTransform: 'capitalize',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 16,
    color: COLORS.text,
  },
  loadingContainer: {
    paddingVertical: 24,
  },
});
