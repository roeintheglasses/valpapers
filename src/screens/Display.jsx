import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';

import {useHeaderHeight} from '@react-navigation/elements';

import ImageModal from 'react-native-image-modal';
import RNFetchBlob from 'rn-fetch-blob';

import Icon from 'react-native-vector-icons/AntDesign';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;

function getExtention(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
}

export default function Display({navigation, route}) {
  const [item, setId] = useState(route.params.item);
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
      {/* <ImageBackground
        source={{uri: uri}}
        style={{height: '100%', width: '100%'}}
        onLoadStart={() => setActivityIndicator(true)}
        onLoadEnd={() => setActivityIndicator(false)}>
        <ActivityIndicator
          color="#FFF"
          size="large"
          style={{
            position: 'absolute',
            top: Dev_Height - 0.5 * Dev_Height,
            right: Dev_Width - 0.55 * Dev_Width,
          }}
          animating={activityIndicator}
        />
        <View style={styles.close_button_style}>
          <TouchableOpacity
            style={styles.Close_Button_Touchable}
            onPress={() => navigation.goBack()}>
            <Icon name="left" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: '70%',
            width: '100%',
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={handleDownload}
            style={{
              height: '8%',
              width: '40%',
              borderRadius: 15,
              backgroundColor: 'rgba(225,225,225,0.9)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#121212', fontSize: 16}}>Download</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground> */}
    </View>
  );
}
