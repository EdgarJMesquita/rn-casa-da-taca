import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 15
  },

  title: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 22,
    marginLeft: 10
  },

  form: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.black100,
    borderRadius: 10,
    padding: 20
  },

  label: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 14,
    marginBottom: 10,
  },

  button: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: theme.colors.primary
  },

  text: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 14,
  },

  buttonTitle: {
    fontFamily: theme.fonts.Ubuntu_400,
    color: theme.colors.text,
    fontSize: 14
  },

  select: {
    backgroundColor: theme.colors.black80,
    height: 40,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 15
  },
  
  textArea: {
    backgroundColor: theme.colors.black80,
    color: theme.colors.text,
    fontFamily: theme.fonts.Roboto_400,
    fontSize: 14,
    height: 70,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top'
  },

  total: {
    fontFamily: theme.fonts.Ubuntu500,
    color: theme.colors.text,
    fontSize: 30,
    alignSelf: 'flex-end'
  },

  submitButton: {
    backgroundColor: theme.colors.primary,
    height: 40,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtonText: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 18
  }
});