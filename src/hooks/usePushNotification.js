import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { api } from '../services/api';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

let notificationListener = null;

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Test title',
    body: 'Test body',
    data: { testData: 'test data' }
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
}

const registerForPushNotificationsAsync = async userId => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    if (userId) {
      await api.put('/user/update-onesignal-id', {
        userId,
        oneSignalUserId: token
      });
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }

  return token;
};

const handleNotificationReceived = setNotification => {
  notificationListener = Notifications.addNotificationReceivedListener(
    notification => {
      setNotification(notification);
    }
  );
};

const removeNotificationListener = () => {
  if (notificationListener) {
    Notifications.removeNotificationSubscription(notificationListener);
    notificationListener = null;
  }
};

export {
  registerForPushNotificationsAsync,
  handleNotificationReceived,
  removeNotificationListener,
  sendPushNotification
};
