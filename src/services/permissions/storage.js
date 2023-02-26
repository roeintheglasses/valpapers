import {PermissionsAndroid, Alert} from 'react-native';

export async function RequestStoragePermission() {
  try {
    if (Platform.OS !== 'android') return;

    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (result !== PermissionsAndroid.RESULTS.granted) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Valpapers Storage Permission',
          message:
            'Valpapers needs storage access' +
            'so you can download wallpapers.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Storage permission denied, cannot download!');
      }
    }
  } catch (err) {
    console.warn(err);
  }
}
