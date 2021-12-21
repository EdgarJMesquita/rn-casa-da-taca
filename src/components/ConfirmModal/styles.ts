import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  content: {
    height: 150,
    backgroundColor: theme.colors.black100,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: 20
  },

  input: {
    backgroundColor: theme.colors.black80,
    width: '60%',
    height: 35,
    borderRadius: 5,
    fontFamily: theme.fonts.Roboto_400,
    textAlign: 'center',
    color: theme.colors.text
  },

  button: {
    width: '48%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5
  },

  buttonTitle: {
    fontFamily: theme.fonts.Roboto_700,
    letterSpacing: 0.40,
    color: theme.colors.text,
    fontSize: 18
  }
});