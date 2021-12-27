import * as Notifications from 'expo-notifications';
import { set, ref, get } from 'firebase/database';
import { Platform } from 'react-native';
import { database } from '../service/database';

type SendNotificationParams = {
  title: string;
  body: string;
}

type KeyProps = {
  [key:string]: {
    role: 'admin'|'attendant';
    token: string;
  }
}

export async function fetchKeys(role: 'admin'|'attendant') {
  try {
    const keyRef = ref(database, 'notification');
    const res = await get(keyRef);
    const data:KeyProps|undefined = res.val();
    if(!data) return;

    const key = Object.values(data).filter(item=>item.role===role).map(item=>item.token);    
    
    return key;

  } catch (error) {
    console.log(error);
  }
}

export async function sendNotificationToKitchen(message:SendNotificationParams) {
  const url = 'https://exp.host/--/api/v2/push/send';
  try {
    const keys = await fetchKeys('admin');
    if(!keys) return console.log('error em recuperar key de admin');

    keys.forEach(async(item)=>{
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          "host": "exp.host",
          "accept": "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ...message,
          to: item
        })
      });
  
      const data = await response.json();
      console.log('notificação enviada');
    });

  } catch (error) {
    console.log(error);
  }
}

export async function sendNotificationToAttendant(message:SendNotificationParams) {
  const url = 'https://exp.host/--/api/v2/push/send';
  try {
    const keys = await fetchKeys('attendant');
    if(!keys) return console.log('error em recuperar key de admin');

    keys.forEach(async(item)=>{
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          "host": "exp.host",
          "accept": "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ...message,
          to: item
        })
      });
  
      const data = await response.json();
      console.log('notificação enviada');
    });

  } catch (error) {
    console.log(error);
  }
}

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

export async function updateMobileKey(token: string, role: 'admin'|'attendant', uid: string) {
  try {
    const keyRef = ref(database, `notification/${uid}`)
    await set(keyRef, {
      token,
      role
    });
    console.log({token, role});

  } catch (error) {
    console.log(error);
  }
}

export async function name() {
  
}