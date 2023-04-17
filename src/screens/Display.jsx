import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';

import ManageWallpaper, {TYPE} from '@tierrybr/react-native-manage-wallpaper';

import {useHeaderHeight} from '@react-navigation/elements';

import ImageModal from 'react-native-image-modal';
import RNFetchBlob from 'rn-fetch-blob';

import {Button, Snackbar} from 'react-native-paper';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;

function getExtention(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
}

export default function Display({navigation, route}) {
  const [uri, setUri] = useState(route.params.uri);
  const headerHeight = useHeaderHeight();
  const [visible, setVisible] = React.useState(false);

  const showDownloadSnackbar = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);

  async function RequestStoragePermission() {
    return new Promise(async (resolve, reject) => {
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
            reject(false);
          }
        }
        resolve(true);
      } catch (err) {
        console.warn(err);
        reject(false);
      }
    });
  }

  function downloadImage() {
    try {
      let date = new Date();
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
      config(options).fetch('GET', imageUri);
      showDownloadSnackbar();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDownload() {
    let storagPermission = await RequestStoragePermission();
    if (!storagPermission) {
      return;
    }
    downloadImage();
  }

  function handleSetWallpaper() {
    ManageWallpaper.setWallpaper(
      {
        uri: uri,
      },
      res => console.log(res),
      TYPE.HOME,
    );
  }

  return (
    <View
      style={{
        height: Dev_Height - headerHeight,
        width: Dev_Width,
        backgroundColor: '#111111',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          height: '85%',
          width: Dev_Width,
          backgroundColor: '#111111',
        }}>
        <ImageModal
          resizeMode="contain"
          swipeToDismiss={true}
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
      </View>
      <View style={[styles.fabStyle, {bottom: headerHeight - 25}]}>
        <Button
          mode="contained"
          onPress={handleSetWallpaper}
          style={{backgroundColor: '#f74755'}}>
          Set Wallpaper
        </Button>
        <Button
          mode="contained"
          onPress={handleDownload}
          style={{backgroundColor: '#f74755'}}>
          Download
        </Button>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        wrapperStyle={{top: 0, position: 'absolute'}}
        duration={5000}
        action={{
          label: 'close',
          onPress: onDismissSnackBar,
        }}>
        Wallpaper Downloaded!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    width: Dev_Width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Dev_Width / 10,
  },
});
