import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import useWallpapers from '../services/valorantApi/wallpapers';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;
const Item_Width = Dev_Width - 0.6 * Dev_Width;

function HomeScreenCarousel({navigation}) {
  const {status, data, error} = useWallpapers();

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() =>
          navigation.navigate('Display', {
            item: item,
          })
        }>
        <Image
          source={{uri: item['largeArt']}}
          style={{height: '100%', width: '100%', borderRadius: 15}}
        />
      </TouchableOpacity>
    );
  };

  if (status === 'loading') {
    return (
      <Text
        style={{
          fontSize: 18,
          color: '#FFF',
          fontWeight: 'bold',
          marginLeft: '5%',
        }}>
        Loading...
      </Text>
    );
  }

  if (status === 'error') {
    return (
      <Text
        style={{
          fontSize: 18,
          color: '#FFF',
          fontWeight: 'bold',
          marginLeft: '5%',
        }}>
        Error : {error.message}
      </Text>
    );
  }

  return (
    <Carousel
      layout={'default'}
      data={data}
      sliderWidth={Dev_Width}
      itemWidth={Item_Width}
      renderItem={_renderItem}
      bounces={true}
      keyExtractor={(item, index) => item.uuid + index.toString()}
      activeSlideAlignment={'center'}
      autoplay={true}
      loop={true}
    />
  );
}

export default HomeScreenCarousel;
