import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  StyleSheet,
  Alert,
  PermissionsAndroid,
} from 'react-native';

import {useHeaderHeight} from '@react-navigation/elements';

import ImageModal from 'react-native-image-modal';
import RNFetchBlob from 'rn-fetch-blob';

import {AnimatedFAB, Snackbar} from 'react-native-paper';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;

function getExtention(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
}

export default function Display({navigation, route}) {
  const [uri, setUri] = useState(route.params.uri);
  const headerHeight = useHeaderHeight();

  async function RequestStoragePermission() {
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

  function downloadImage() {
    var date = new Date();
    let imageUri = uri;
    var ext = getExtention(imageUri);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/valpapers_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', imageUri)
      .then(res => {
        Alert.alert('Download Success !');
      });
  }

  async function handleDownload() {
    await RequestStoragePermission();
    downloadImage();
  }

  return (
    <View
      style={{
        height: Dev_Height - headerHeight,
        width: Dev_Width,
        backgroundColor: '#111111',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageModal
        resizeMode="contain"
        imageBackgroundColor="#111111"
        style={{
          width: Dev_Width,
          height: '100%',
          backgroundColor: '#111111',
        }}
        source={{
          uri: uri,
        }}
      />

      <AnimatedFAB
        icon={'download'}
        label={'Download'}
        extended={true}
        onPress={handleDownload}
        visible={true}
        animateFrom={'right'}
        style={[styles.fabStyle, {bottom: headerHeight - 10}]}
        color={'#fff'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fabStyle: {
    left: '34%',
    position: 'absolute',
    backgroundColor: '#f74452',
  },
});
