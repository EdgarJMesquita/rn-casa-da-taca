import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/* export async function sendNotification() {
  const token = await registerForPushNotificationsAsync();
  const url = 'https://exp.host/--/api/v2/push/send';
  const headers = {
    "host": "exp.host",
    "accept": "application/json",
    "accept-encoding": "gzip, deflate",
    "content-type": "application/json"
  }
  const body = {
    to: token,
    title: 'hello',
    body: 'world'
  }

  try {
    const response = await fetch(url,{
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    console.log(response);
    
  } catch (error) {
    console.log(error);
  }
} */

export async function registerForPushNotificationsAsync() {
  let token;
 
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync({experienceId: '@xongas/casadataca'})).data;
  console.log(token);
 

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}