import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {Button} from 'react-native-paper';

import useWallpapers from '../services/valorantApi/wallpapers';
import PlayerCardsGallary from '../components/PlayerCardsGallary';
import {log} from 'react-native-reanimated';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;

const PLAYER_CARD_HEIGHT = Dev_Height - 0.7 * Dev_Height;

const getItemLayout = (data, index) => ({
  length: PLAYER_CARD_HEIGHT, // replace with the actual height of your item
  offset: 15,
  index,
});

const convertTo12CardArray = data => {
  if (!Array.isArray(data)) {
    throw new Error('data must be an array');
  }
  if (data.length < 12) {
    return [data];
  }
  let selectedCards = data.sort(() => 0.5 - Math.random());
  selectedCards = selectedCards.reduce((acc, val, i) => {
    if (i % 12 === 0) {
      acc.push([val]);
    } else {
      acc[acc.length - 1].push(val);
    }
    return acc;
  }, []);

  return selectedCards;
};

export default function PlayerCards({route, navigation}) {
  const flatListRef = useRef();
  const {data, isLoading, isError, isSuccess} = useWallpapers();
  const [playerCards, setPlayerCards] = useState([]);
  const [currentTwoDIndex, setCurrentTwoDIndex] = useState(0);
  const [twoDCards, setTwoDCards] = useState([]);
  const [isDataSet, setIsDataSet] = useState(false);

  useEffect(() => {
    if (isSuccess && Array.isArray(data) && !isDataSet) {
      let selectedCards = convertTo12CardArray(data);
      setTwoDCards(selectedCards);
      setPlayerCards(selectedCards[0]);
      setCurrentTwoDIndex(0);
      setIsDataSet(true);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.FlatList_Container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const moveToTop = () => flatListRef.current.scrollToOffset({offset: 0});

  const handleOnNext = () => {
    let nextIndex = currentTwoDIndex + 1;
    if (nextIndex < twoDCards.length) {
      setCurrentTwoDIndex(nextIndex);
      setPlayerCards(twoDCards[nextIndex]);
      moveToTop();
    }
  };

  const handleOnBack = () => {
    let prevIndex = currentTwoDIndex - 1;
    if (prevIndex >= 0) {
      setCurrentTwoDIndex(prevIndex);
      setPlayerCards(twoDCards[prevIndex]);
      moveToTop();
    }
  };

  const getListFooter = () => {
    return (
      <View style={styles.footer}>
        {currentTwoDIndex > 0 && (
          <Button
            style={{
              borderRadius: 10,
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
            labelStyle={{fontSize: 18}}
            buttonColor="#ff5d5e"
            textColor="white"
            mode="contained-tonal"
            onPress={handleOnBack}>
            Back
          </Button>
        )}

        {currentTwoDIndex < twoDCards.length && (
          <Button
            style={{
              borderRadius: 10,
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
            labelStyle={{fontSize: 18}}
            buttonColor="#ff5d5e"
            textColor="white"
            mode="contained-tonal"
            onPress={handleOnNext}>
            Next
          </Button>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.FlatList_Container}>
        <FlatList
          ref={flatListRef}
          contentContainerStyle={{paddingBottom: 10}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={3}
          scrollEnabled={true}
          data={playerCards}
          renderItem={cardData => <PlayerCardsGallary cardData={cardData} />}
          keyExtractor={(item, index) => {
            return item.uuid + index.toString();
          }}
          ItemSeparatorComponent={() => {
            return <View style={{height: 15}} />;
          }}
          initialNumToRender={9}
          getItemLayout={getItemLayout}
          scrollsToTop={true}
          ListFooterComponent={getListFooter}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dev_Width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  FlatList_Container: {
    width: '90%',
  },
  footer: {
    padding: 20,
    paddingBottom: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
