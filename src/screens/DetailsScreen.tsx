import FastImage from 'react-native-fast-image';
import NetInfo from '@react-native-community/netinfo';
import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
// @ts-ignore
import styled from 'styled-components';

import { TitleTopBar, OfflineNotice } from '../components';
import Swiper, { SwipeDirections } from '../components/Swiper';
import { extractDetails } from '../utils/helpers';

import { CLIENT_ID } from '../constants/authorization';
import colors from '../constants/colors';
import globals from '../constants/globals';

/**
 * Screen component for can details.
 */
const DetailsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const _catalogue = navigation.getParam('_catalogue');
  const _index = navigation.getParam('_index');
  const [index, setIndex] = useState(_index);
  const [can, setCan] = useState(extractDetails(_catalogue[_index]));
  const [connected, setConnected] = useState(true);
  const [clicked, setClicked] = useState(false);

  /**
   * When screen is first rendered we register a connection listener.
   */
  useEffect(() => {
    NetInfo.isConnected.addEventListener('connectionChange', handleConnectivityChange);
    NetInfo.isConnected.fetch().then((isConnected: boolean) => {
      setConnected(isConnected);
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
    const { SWIPE_LEFT, SWIPE_RIGHT } = SwipeDirections;
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
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeArea}>
      <ScrollView>
        <Swiper onSwipe={(direction: string) => onSwipe(direction)} config={globals.swipeConfig} style={styles.swiper}>
          <TitleTopBar
            title={can.title}
            onBack={() => {
              NetInfo.isConnected.removeEventListener('connectionChange', handleConnectivityChange);
              navigation.goBack(null);
            }}
          />
          <If condition={clicked && !connected} then={<OfflineNotice />} />
          <TouchableOpacity
            onPress={() => {
              setClicked(true);
              if (connected) {
                navigation.navigate('Images', { _can: can });
              }
            }}
          >
            <FastImage source={{ uri: can.link, priority: FastImage.priority.normal }} style={styles.image} />
          </TouchableOpacity>

          <BrandText>{can.brand}</BrandText>
          <InfoText>{can.info}</InfoText>
          <Delimiter />
          <KeyValueTextPair>
            <BoldAttributeName>Country of Origin: </BoldAttributeName>
            <AttributeValue>{can.origin}</AttributeValue>
          </KeyValueTextPair>
          <KeyValueTextPair>
            <BoldAttributeName>Bought in: </BoldAttributeName>
            <AttributeValue>{can.bought}</AttributeValue>
          </KeyValueTextPair>
          <KeyValueTextPair>
            <BoldAttributeName>Can Color: </BoldAttributeName>
            <AttributeValue>{can.color}</AttributeValue>
          </KeyValueTextPair>
          <KeyValueTextPair>
            <BoldAttributeName>Size: </BoldAttributeName>
            <AttributeValue>{can.quantity}</AttributeValue>
          </KeyValueTextPair>
          <KeyValueTextPair>
            <BoldAttributeName>Ownership: </BoldAttributeName>
            <AttributeValue>{can.ownership}</AttributeValue>
          </KeyValueTextPair>
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
    paddingBottom: 20
  },
  image: {
    width: 220,
    height: 300,
    marginTop: 50,
    borderRadius: 20
  },
  safeArea: {
    flex: 1
  }
});

const BoldAttributeName = styled.Text`
  font-weight: bold;
  color: ${colors.darkCharcoal};
  font-size: 16;
`;

const AttributeValue = styled.Text`
  font-size: 16;
  color: ${colors.darkCharcoal};
`;

const Delimiter = styled.View`
  border-bottom-color: ${colors.black};
  border-bottom-width: 1;
  width: 70%;
  margin-vertical: 10;
`;

const KeyValueTextPair = styled.View`
  flex-direction: row;
`;

const BrandText = styled.Text`
  font-size: 32;
  color: ${colors.darkCharcoal};
  margin-vertical: 10;
`;

const InfoText = styled.Text`
  font-size: 22;
  color: ${colors.darkCharcoal};
  text-align: center;
  font-style: italic;
`;

const FlexContainer = styled.View`
  flex: 1;
`;

export default DetailsScreen;
