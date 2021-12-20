import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },

  label: {
    width: '100%', 
    height: 50, 
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontFamily: theme.fonts.Roboto_700,
    fontSize: 22,
    color: theme.colors.text,
    letterSpacing: 0.30,
    marginLeft: 25,
    marginTop: 25,
    marginBottom: 10
  },

  subtitle: {
    fontFamily: theme.fonts.Roboto_400,
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 10,
    marginTop: 10,
    letterSpacing: 0.30,
    marginLeft: 2
  },

  noMembersMessage: {
    fontFamily: theme.fonts.Roboto_400,
    fontSize: 15,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  }
});