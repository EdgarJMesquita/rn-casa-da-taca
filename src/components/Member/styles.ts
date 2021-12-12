import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.black100,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },

  title: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 18,
    marginLeft: 15
  }
});