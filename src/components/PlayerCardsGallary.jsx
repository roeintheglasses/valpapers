import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, TouchableOpacity, Dimensions} from 'react-native';
import {log} from 'react-native-reanimated';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;
function PlayerCardsGallary({cardData}) {
  const navigation = useNavigation();
  const {item, index} = cardData;
  return (
    <TouchableOpacity
      style={{
        height: Dev_Height - 0.7 * Dev_Height,
        borderRadius: 15,
      }}
      onPress={() => {
        let itemUpscaledUri = `https://d8uzpuspsyebn.cloudfront.net/playerCards/${item.uuid}.png`;
        console.log(itemUpscaledUri);
        navigation.navigate('Wallpaper', {
          item: item,
          uri: itemUpscaledUri,
        });
      }}>
      <Image
        source={{uri: item.largeArt}}
        style={{
          height: '100%',
          resizeMode: 'cover',
          width: '100%',
          aspectRatio: 9 / 21,
          borderRadius: 15,
        }}
      />
    </TouchableOpacity>
  );
}

export default memo(PlayerCardsGallary);
