import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.black80,
    alignItems: 'center'
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },

  userInitials: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
  },

  username: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    marginTop: 10,
    fontSize: 20
  }
});