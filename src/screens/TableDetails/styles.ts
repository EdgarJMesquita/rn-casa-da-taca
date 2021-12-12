import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },

  tableLabel: {
    width: '100%', 
    height: 50, 
    backgroundColor: theme.colors.primary,
    justifyContent: 'center'
  },

  title: {
    fontFamily: theme.fonts.Roboto_700,
    fontSize: 22,
    color: theme.colors.text,
    textAlign: 'center',
    letterSpacing: 0.30,
    marginBottom: 5
  },

  subtitle: {
    fontFamily: theme.fonts.Roboto_700,
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 20,
    letterSpacing: 0.30
  },

  noMembersMessage: {
    fontFamily: theme.fonts.Roboto_400,
    fontSize: 15,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  }
});