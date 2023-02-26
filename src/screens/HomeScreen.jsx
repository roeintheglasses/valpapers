import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;
const Item_Width = Dev_Width - 0.6 * Dev_Width;

import useWallpapers from '../services/valorantApi/wallpapers';
import ImageCarousel from '../components/ImageCarousel';

import {MAIN_WALLPAPERS, VAL_LOGO} from '../wallpaperList.json';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

export default HomeScreen = ({navigation}) => {
  const [topWallpapers, setTopWallpapers] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);

  //TODO: Handle status, loadind & error
  const {data, isLoading, isError, isSuccess} = useWallpapers();

  const x = useRef(new Animated.Value(-100)).current;

  const slide = () => {
    Animated.spring(x, {
      toValue: 0,
      useNativeDriver: true,
      speed: 0.2,
    }).start();
  };

  const setupTopWallpapers = () => {
    let topPapers = MAIN_WALLPAPERS.sort(() => 0.5 - Math.random()).slice(
      0,
      10,
    );
    setTopWallpapers(topPapers);
  };

  useEffect(() => {
    slide();
    setupTopWallpapers();
  }, []);

  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      let selectedCards = data.sort(() => 0.5 - Math.random()).slice(0, 8);
      setPlayerCards(selectedCards);
    }
  }, [data]);

  const renderPlayerCards = ({item, index}) => {
    if (index === 7) {
      return (
        <TouchableOpacity
          style={{
            height: '90%',
            width: Dev_Width - 0.7 * Dev_Width,
            backgroundColor: 'transparent',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('PlayerCards');
          }}>
          <View style={styles.showMoreCard}>
            <Text style={styles.showMoreCardText}>Show</Text>
            <Text style={styles.showMoreCardText}>More</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={{
          height: '90%',
          width: Dev_Width - 0.7 * Dev_Width,
          backgroundColor: 'transparent',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() =>
          navigation.navigate('Wallpaper', {item: item, uri: item.largeArt})
        }>
        <ImageBackground
          source={{uri: item.largeArt}}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 15,
            flex: 1,
            justifyDirection: 'flex-end',
          }}
          imageStyle={{
            borderRadius: 15,
            top: 0,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => (
    <View
      style={{
        width: 15,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{height: '100%', width: '100%'}}>
        <ImageBackground
          source={{
            uri: VAL_LOGO,
          }}
          style={styles.MainBackground_View}
          imageStyle={{
            height: '100%',
            width: '100%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              paddingTop: StatusBar.currentHeight,
            }}></View>
        </ImageBackground>

        <View style={{height: '10%', justifyContent: 'center', width: '100%'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFF',
              fontWeight: 'bold',
              marginLeft: '5%',
            }}>
            Top Picks
          </Text>
        </View>

        <View style={{height: '25%', justifyContent: 'center', width: '100%'}}>
          <ImageCarousel navigation={navigation} data={topWallpapers} />
        </View>

        <View style={{height: '10%', justifyContent: 'center', width: '100%'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFF',
              fontWeight: 'bold',
              marginLeft: '5%',
            }}>
            Player Cards
          </Text>
        </View>

        <View
          style={{
            height: '25%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            style={{
              height: '100%',
              width: '93%',
            }}
            data={playerCards}
            keyExtractor={(item, index) => {
              return item.uuid + index.toString();
            }}
            renderItem={renderPlayerCards}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={renderSeparator}
            alwaysBounceHorizontal={true}
            bounces={true}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={100} // Increase time between renders
            windowSize={7} // Reduce the window size
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width,
    backgroundColor: '#111111',
  },
  MainBackground_View: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
  },
  showMoreCard: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2f2f2f',
    backgroundColor: '#2f2f2f',
  },
  showMoreCardText: {
    fontSize: 26,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'VALORANT',
  },
});
