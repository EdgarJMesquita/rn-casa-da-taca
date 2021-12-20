import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.black100,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 15
  },

  close: {
    position: 'absolute',
    top: 10,
    right: 10
  },

  leftBar: {
    backgroundColor: theme.colors.primary,
    width: 13,
    height: '100%',
  },

  title: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 22,
    marginTop: 10,
    marginLeft: 15
  },

  form: {
    flex: 1, 
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 20
  },

  label: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 14,
    marginBottom: 3
  },

  button: {
    width: '100%',
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primary
  },

  text: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 16,
  },

  buttonTitle: {
    fontFamily: theme.fonts.Ubuntu_400,
    color: theme.colors.text,
  },

  select: {
    backgroundColor: theme.colors.black80,
    height: 35,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  
  textArea: {
    backgroundColor: theme.colors.black80,
    color: theme.colors.text,
    fontFamily: theme.fonts.Roboto_400,
    fontSize: 16,
    minHeight: 35,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    marginBottom: 25,
    padding: 5
  },

  total: {
    fontFamily: theme.fonts.Ubuntu500,
    color: theme.colors.text,
    fontSize: 22,
    marginTop: 1
  },

  submitButton: {
    backgroundColor: theme.colors.primary,
    height: 30,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },

  submitButtonText: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 15
  },

  drinkCard: {
    width: '100%',
    backgroundColor: theme.colors.black100,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 50,
  },

  drinkTitle: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 22,
    marginLeft: 10
  },

  drinkTotal: {
    fontFamily: theme.fonts.Ubuntu500,
    color: theme.colors.text,
    fontSize: 22,
    marginRight: 15
  }
});