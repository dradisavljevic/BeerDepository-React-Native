import React, {useEffect, useState} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import beerApi from '../api/api';
import {Spinner, TitleTopBar} from '../components';
import {extractImages} from '../utils/helpers';
import If from '../utils/conditional';
import {StackParamList} from '../utils/navigationTypes';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';

import colors from '../constants/colors';

/**
 * Screen component for can images.
 */
const ImageScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<StackParamList, 'Image'>) => {
  const _can = route.params._can;
  const [links, setLinks] = useState<IImageInfo[]>([]);

  /**
   * Asynchronous get request for all the can images.
   */
  const getImages = async () => {
    let imageArray: IImageInfo[] = [];
    if (_can.album !== '') {
      await beerApi
        .get(_can.album)
        .then(response => {
          const data = response.data.data.images;
          imageArray = extractImages(data);
        })
        .catch(error => {
          if (error.message === 'Network Error') {
            navigation.navigate('NoInternet');
          } else if (error.message === 'Request failed with status code 404') {
            navigation.navigate('NoInternet'); // TODO: Smisliti neki dobar dizajn za ovo cudo
          } else if (error.message === 'Request failed with status code 401') {
            navigation.navigate('NoInternet'); // TODO: Smisliti neki dobar dizajn za ovo cudo
          }
        });
    } else {
      imageArray = [{url: _can.link}];
    }
    setLinks(imageArray);
  };

  useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TitleTopBar title={_can.title} onBack={() => navigation.goBack()} />
      <If
        condition={links.length === 0}
        then={<Spinner />}
        else={
          <ImageViewer
            backgroundColor={colors.black}
            imageUrls={links}
            pageAnimateTime={150}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

export default ImageScreen;
