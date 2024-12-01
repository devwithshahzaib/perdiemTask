import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/colors';

export default StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
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
