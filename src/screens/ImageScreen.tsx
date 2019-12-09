import React, { useEffect, useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import beerApi from '../api/api';
import { Spinner, TitleTopBar } from '../components';
import { extractImages } from '../utils/helpers';

import colors from '../constants/colors';

/**
 * Screen component for can images.
 */
const ImageScreen = ({ navigation }) => {
  const _can = navigation.getParam('_can');
  const [links, setLinks] = useState([]);

  /**
   * Asynchronous get request for all the can images.
   */
  const getImages = async () => {
    let imageArray = [];
    if (_can.album !== '') {
      const response = await beerApi
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
      imageArray = [{ url: _can.link }];
    }
    setLinks(imageArray);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeArea}>
      <TitleTopBar title={_can.title} onBack={() => navigation.goBack(null)} />
      <If
        condition={links.length === 0}
        then={<Spinner />}
        else={<ImageViewer backgroundColor={colors.black} imageUrls={links} pageAnimateTime={150} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black
  }
});

export default ImageScreen;
