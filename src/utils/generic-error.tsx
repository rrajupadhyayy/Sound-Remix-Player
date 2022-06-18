import { emptyFunction } from 'config/misc';
import { staticText } from 'config/staticText';
import { Alert } from 'react-native';

export default function genericError(title?: string) {
  return Alert.alert(title || staticText.genericError);
}

export function errorWithRetry({
  title,
  callback,
}: {
  title?: string;
  callback: Function;
}) {
  return Alert.alert(title || staticText.genericRetryError, '', [
    {
      text: staticText.cancel,
      onPress: emptyFunction,
      style: 'cancel',
    },
    {
      text: staticText.ok,
      onPress: () => callback(),
    },
  ]);
}
