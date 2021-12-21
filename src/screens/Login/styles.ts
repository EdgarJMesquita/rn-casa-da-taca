import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },

  title: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 35,
    marginBottom: 25
  },

  input: {
    height: 50,
    width: '100%',
    backgroundColor: theme.colors.black100,
    color: theme.colors.text,
    fontFamily: theme.fonts.Roboto_400,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 15
  },

  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },

  buttonTitle: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 20,
    letterSpacing: 0.40,
  }
});