import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 340,
    backgroundColor: theme.colors.black100,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 10
  },

  close: {
    position: 'absolute',
    top: 10,
    right: 10
  },

  leftBar: {
    backgroundColor: theme.colors.primary,
    width: 13,
    height: 340
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
    paddingTop: 40,
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
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: theme.colors.primary
  },

  text: {
    fontFamily: theme.fonts.Roboto_400,
    color: theme.colors.text,
    fontSize: 12,
  },

  buttonTitle: {
    fontFamily: theme.fonts.Ubuntu_400,
    color: theme.colors.text,
  },

  select: {
    backgroundColor: theme.colors.black80,
    height: 30,
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
    fontSize: 12,
    minHeight: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'center'
  },

  total: {
    fontFamily: theme.fonts.Ubuntu500,
    color: theme.colors.text,
    fontSize: 22,
    alignSelf: 'flex-end'
  },

  submitButton: {
    backgroundColor: theme.colors.primary,
    height: 30,
    width: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtonText: {
    fontFamily: theme.fonts.Roboto_700,
    color: theme.colors.text,
    fontSize: 15
  },

  drinkCard: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.black100,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    
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