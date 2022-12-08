import React, {useEffect, useState, useRef} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import beerApi from '../api/api';
import {
  CatalogueButton,
  CatalogueItem,
  Spinner,
  TopBarWithSearchBar,
} from '../components';
import Swiper, {SwipeDirections} from '../components/Swiper';
import {clearDescription, filterCans} from '../utils/helpers';

import {ALBUM_ID} from '../constants/authorization';
import colors from '../constants/colors';
import globals from '../constants/globals';
import {imageData} from '../constants/types';
import t from '../i18n/i18n';
import If from '../utils/conditional';
import {StackParamList} from '../utils/navigationTypes';

/**
 * Screen component for can catalogue.
 */
const CatalogueScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'Catalogue'>) => {
  type ItemType = {link: string; title: string; description: string};
  const [content, setContent] = useState<imageData[]>([]);
  const [scrolling, setScrolling] = useState(false);
  const [page, setPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [catalogue, setCatalogue] = useState<imageData[]>([]);
  let flatListRef: any = useRef<HTMLDivElement>(null);

  /**
   * Asynchronous get request for all the cans in catalogue.
   */
  const getList = async () => {
    await beerApi
      .get(ALBUM_ID)
      .then(response => {
        const data = clearDescription(response.data.data.images).sort(
          (a: imageData, b: imageData) => {
            return a.title > b.title ? 1 : -1;
          },
        );
        setContent(data);
        setCatalogue(data);
        const pages =
          data.length === 0 ? 0 : Math.floor((data.length - 1) / 10);
        setPageNumber(pages);
        setLoading(false);
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
  };

  /**
   * Hook that makes sure get request gets called only on first render.
   */
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Search function that filters through cans.
   */
  const searchCans = (term: string) => {
    let data = filterCans(term, catalogue);
    const pages = data.length === 0 ? 0 : Math.floor((data.length - 1) / 10);
    setPageNumber(pages);
    setPage(0);
    setContent(data);
  };

  /**
   * Function that clears results from the previously done search.
   */
  const clearSearch = () => {
    setContent(catalogue);
    const pages =
      catalogue.length === 0 ? 0 : Math.floor((catalogue.length - 1) / 10);
    setPageNumber(pages);
    setPage(0);
  };

  /**
   * Function handler for swiping actions.
   */
  const onSwipe = (gestureName: string) => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = SwipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        if (page !== pageNumber && !scrolling) {
          setPage(page + 1);
          flatListRef!.scrollToOffset({animated: true, offset: 0});
        }
        break;
      case SWIPE_RIGHT:
        if (page !== 0 && !scrolling) {
          flatListRef!.scrollToOffset({animated: true, offset: 0});
          setPage(page - 1);
        }
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Swiper
        onSwipe={(direction: string) => onSwipe(direction)}
        config={globals.swipeConfig}
        style={styles.swiper}>
        <TopBarWithSearchBar
          searchAction={searchCans}
          clearSearch={clearSearch}
        />
        <If
          condition={pageNumber !== 0}
          then={
            <View style={styles.pageCounterStyle}>
              <Text style={styles.pageNumberLabelStyle}>
                {t.PAGE} {page + 1} {t.OF} {pageNumber + 1}
              </Text>
            </View>
          }
        />
        <If
          condition={!loading}
          then={
            <FlatList
              data={content.slice(page * 10, page * 10 + 10)}
              style={styles.flatList}
              onMomentumScrollEnd={() => setScrolling(false)}
              onMomentumScrollBegin={() => setScrolling(true)}
              ListEmptyComponent={
                <If
                  condition={content.length === 0}
                  then={
                    <Text
                      style={styles.emptyListNoticeStyle}
                      adjustsFontSizeToFit
                      numberOfLines={1}>
                      {t.EMPTY_LIST_NOTICE}
                    </Text>
                  }
                />
              }
              ref={ref => {
                flatListRef = ref;
              }}
              renderItem={({item, index}: {item: ItemType; index: number}) => (
                <CatalogueItem
                  link={item.link}
                  description={item.description}
                  title={item.title}
                  onPress={() => {
                    navigation.navigate('Details', {
                      _catalogue: content,
                      _index: page * 10 + index,
                    });
                  }}
                />
              )}
              keyExtractor={(item, index) => `${index}`}
            />
          }
          else={<Spinner />}
        />
        <View style={styles.buttonFooterStyle}>
          <CatalogueButton
            disabled={page === 0}
            onPress={() => {
              setPage(page - 1);
              flatListRef!.scrollToOffset({animated: true, offset: 0});
            }}>
            {t.PREV_BUTTON.toUpperCase()}
          </CatalogueButton>
          <CatalogueButton
            disabled={page === pageNumber}
            onPress={() => {
              setPage(page + 1);
              flatListRef!.scrollToOffset({animated: true, offset: 0});
            }}>
            {t.NEXT_BUTTON.toUpperCase()}
          </CatalogueButton>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'flex-start',
  },
  flatList: {
    backgroundColor: colors.white,
  },
  safeArea: {
    flex: 1,
  },
  pageCounterStyle: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: colors.white,
  },
  pageNumberLabelStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.baliHai,
  },
  buttonFooterStyle: {
    width: globals.deviceWidth,
    height: 70,
    backgroundColor: colors.white,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  emptyListNoticeStyle: {
    color: colors.darkCharcoal,
    textAlign: 'center',
    fontSize: 19,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});

export default CatalogueScreen;
