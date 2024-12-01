import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: 0,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonActive: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  actionButtonTextActive: {
    color: COLORS.secondary,
  },
});
