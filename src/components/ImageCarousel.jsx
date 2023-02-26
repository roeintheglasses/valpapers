import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;
const Item_Width = Dev_Width - 0.6 * Dev_Width;

function ImageCarousel({navigation, data}) {
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
          navigation.navigate('Wallpaper', {
            item: item,
            uri: item.uri,
          })
        }>
        <Image
          source={{uri: item.uri}}
          style={{height: '100%', width: '100%', borderRadius: 15}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      layout={'default'}
      data={data}
      sliderWidth={Dev_Width}
      itemWidth={Item_Width}
      renderItem={_renderItem}
      bounces={true}
      keyExtractor={(item, index) => {
        return item.id + index.toString();
      }}
      activeSlideAlignment={'center'}
      autoplay={true}
      loop={true}
    />
  );
}

export default ImageCarousel;
