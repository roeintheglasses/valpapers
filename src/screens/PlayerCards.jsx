import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Text,
} from 'react-native';

import useWallpapers from '../services/valorantApi/wallpapers';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;

export default function PlayerCards({route, navigation}) {
  const {data, isLoading, isError, isSuccess} = useWallpapers();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.FlatList_Container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.FlatList_Container}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={data}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  height: Dev_Height - 0.7 * Dev_Height,
                  width: '48%',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('ImageDisplay', {
                    id: item['id'],
                  })
                }>
                <Image
                  source={{uri: item.largeArt}}
                  style={{height: '95%', width: '95%', borderRadius: 15}}
                />
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={{height: 10}} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
    paddingTop: StatusBar.currentHeight,
  },
  FlatList_Container: {
    height: '100%',
    width: '95%',
  },
});
