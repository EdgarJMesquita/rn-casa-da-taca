import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30
  },

  title: {
    fontFamily: theme.fonts.Roboto_700,
    fontSize: 22,
    color: theme.colors.text,
    marginBottom: 20
  },

  priceContainer: {
    position: 'absolute',
    bottom: 9,
    right: 18
  },

  price: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text
  },

  noMembersMessage: {
    fontFamily: theme.fonts.Roboto_400,
    fontSize: 15,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  }
});