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
    justifyContent: 'space-between'
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
    fontFamily: theme.fonts.Ubuntu500,
    color: theme.colors.text,
    fontSize: 25,
  },

  subLabel: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 15
  },

  subtitle: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 16
  },

  header: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 25,
    marginTop: 20,
    marginBottom: 5
  }
});