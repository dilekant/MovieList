import {Notifier, NotifierComponents} from 'react-native-notifier';

export function notifier(title, description, alertType) {
  return Notifier.showNotification({
    title: title,
    description: description,
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: alertType,
    },
  });
}
