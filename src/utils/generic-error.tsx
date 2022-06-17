import { staticText } from 'config/staticText';
import { Alert } from 'react-native';

export default function genericError(title?: string) {
  return Alert.alert(title || staticText.genericError);
}
