import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
    alignItems: 'center'
  },

  section: {
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },

  line: {
    borderTopWidth: 0.2,
    borderTopColor: theme.colors.text,
    borderRadius: 2,
    paddingTop: 5
  },

  resume: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 18
  },

  date: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 20
  },

  label: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 20
  },

  title: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 20
  },

  total: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 22,
    marginTop: 1
  },

  totalValue: {
    fontFamily: theme.fonts.Ubuntu500,
    color: theme.colors.text,
    fontSize: 25,
  },

  subLabel: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 15,
    marginTop: 1
  },

  subtitle: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 16
  },

  header: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 20,
    marginTop: 25,
    marginBottom: 5
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },

  buttonTitle: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 20,
    letterSpacing: 0.40
  }
});