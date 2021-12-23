import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.black80,
    marginTop: 50,
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },

  topBar: {
    height: 8,
    backgroundColor: theme.colors.primary,
    width: '50%',
    marginBottom: 50,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  }
});