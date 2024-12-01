import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 16,
    color: COLORS.text,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
  typeText: {
    color: COLORS.secondary,
    textTransform: 'capitalize',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statsContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.text,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    width: 100,
    fontSize: 14,
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  statValue: {
    width: 40,
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'right',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 16,
    color: COLORS.text,
  },
});
