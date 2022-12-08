import FastImage from 'react-native-fast-image';
import NetInfo from '@react-native-community/netinfo';
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {TitleTopBar, OfflineNotice} from '../components';
import Swiper, {SwipeDirections} from '../components/Swiper';
import {extractDetails} from '../utils/helpers';

import colors from '../constants/colors';
import globals from '../constants/globals';
import If from '../utils/conditional';
import {StackParamList} from '../utils/navigationTypes';

/**
 * Screen component for can details.
 */
const DetailsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamList, 'Details'>) => {
  const _catalogue = route.params._catalogue;
  const _index = route.params._index;
  const [index, setIndex] = useState(_index);
  const [can, setCan] = useState(extractDetails(_catalogue[_index]));
  const [connected, setConnected] = useState(true);
  const [clicked, setClicked] = useState(false);

  /**
   * When screen is first rendered we register a connection listener.
   */
  useEffect(() => {
    NetInfo.addEventListener(state => {
      handleConnectivityChange(state.isConnected!);
    });
    NetInfo.fetch().then(state => {
      setConnected(state.isConnected!);
    });
  }, []);

  /**
   * Connection listener function.
   */
  const handleConnectivityChange = (isConnected: boolean) => {
    setConnected(isConnected);
  };

  /**
   * Function handler for swiping actions.
   */
  const onSwipe = (gestureName: string) => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = SwipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        if (index !== _catalogue.length - 1) {
          const newCan = _catalogue[index + 1];
          setCan(extractDetails(newCan));
          setIndex(index + 1);
        }
        break;
      case SWIPE_RIGHT:
        if (index !== 0) {
          const newCan = _catalogue[index - 1];
          setCan(extractDetails(newCan));
          setIndex(index - 1);
        }
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Swiper
          onSwipe={(direction: string) => onSwipe(direction)}
          config={globals.swipeConfig}
          style={styles.swiper}>
          <TitleTopBar
            title={can.title}
            onBack={() => {
              // NetInfo.isConnected.removeEventListener(
              //   'connectionChange',
              //   handleConnectivityChange,
              // );
              navigation.goBack();
            }}
          />
          <If condition={clicked && !connected} then={<OfflineNotice />} />
          <TouchableOpacity
            onPress={() => {
              setClicked(true);
              if (connected) {
                navigation.navigate('Image', {_can: can});
              }
            }}>
            <FastImage
              source={{uri: can.link, priority: FastImage.priority.normal}}
              style={styles.image}
            />
          </TouchableOpacity>

          <Text style={styles.brandTextStyle}>{can.brand}</Text>
          <Text style={styles.infoTextStyle}>{can.info}</Text>
          <View style={styles.delimiterStyle} />
          <View style={styles.keyValueTextPairStyle}>
            <Text style={styles.boldAttributeNameStyle}>
              Country of Origin:{' '}
            </Text>
            <Text style={styles.attributeValueStyle}>{can.origin}</Text>
          </View>
          <View style={styles.keyValueTextPairStyle}>
            <Text style={styles.boldAttributeNameStyle}>Bought in: </Text>
            <Text style={styles.attributeValueStyle}>{can.bought}</Text>
          </View>
          <View style={styles.keyValueTextPairStyle}>
            <Text style={styles.boldAttributeNameStyle}>Can Color: </Text>
            <Text style={styles.attributeValueStyle}>{can.color}</Text>
          </View>
          <View style={styles.keyValueTextPairStyle}>
            <Text style={styles.boldAttributeNameStyle}>Size: </Text>
            <Text style={styles.attributeValueStyle}>{can.quantity}</Text>
          </View>
          <View style={styles.keyValueTextPairStyle}>
            <Text style={styles.boldAttributeNameStyle}>Ownership: </Text>
            <Text style={styles.attributeValueStyle}>{can.ownership}</Text>
          </View>
        </Swiper>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  image: {
    width: 220,
    height: 300,
    marginTop: 50,
    borderRadius: 20,
  },
  safeArea: {
    flex: 1,
  },
  boldAttributeNameStyle: {
    fontWeight: 'bold',
    color: colors.darkCharcoal,
    fontSize: 16,
  },
  attributeValueStyle: {
    fontSize: 16,
    color: colors.darkCharcoal,
  },
  delimiterStyle: {
    borderBottomColo: colors.black,
    borderBottomWidth: 1,
    width: '70%',
    marginVertical: 10,
  },
  keyValueTextPairStyle: {
    flexDirection: 'row',
  },
  brandTextStyle: {
    fontSize: 32,
    color: colors.darkCharcoal,
    marginVertical: 10,
  },
  infoTextStyle: {
    fontSize: 22,
    color: colors.darkCharcoal,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DetailsScreen;
