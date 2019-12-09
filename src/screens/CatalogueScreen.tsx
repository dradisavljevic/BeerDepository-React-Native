import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
// @ts-ignore
import styled from 'styled-components';

import beerApi from '../api/api';
import { CatalogueButton, CatalogueItem, Spinner, TopBarWithSearchBar } from '../components';
import Swiper, { SwipeDirections } from '../components/Swiper';
import { clearDescription, extractDetails, filterCans } from '../utils/helpers';

import { ALBUM_ID } from '../constants/authorization';
import colors from '../constants/colors';
import globals from '../constants/globals';
import { imageData } from '../constants/types';
import t from '../i18n/i18n';

/**
 * Screen component for can catalogue.
 */
const CatalogueScreen = ({ navigation }) => {
  const [content, setContent] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [page, setPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flatList, setFlatList] = useState(null);
  const [catalogue, setCatalogue] = useState([]);

  /**
   * Asynchronous get request for all the cans in catalogue.
   */
  const getList = async () => {
    const response = await beerApi
      .get(ALBUM_ID)
      .then(response => {
        const data = clearDescription(response.data.data.images).sort((a: imageData, b: imageData) => {
          return a.title > b.title ? 1 : -1;
        });
        setContent(data);
        setCatalogue(data);
        const pages = data.length === 0 ? 0 : Math.floor((data.length - 1) / 10);
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
  }, []);

  /**
   * Search function that filters through cans.
   */
  const searchCans = (term: string) => {
    data = filterCans(term, catalogue);
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
    const pages = catalogue.length === 0 ? 0 : Math.floor((catalogue.length - 1) / 10);
    setPageNumber(pages);
    setPage(0);
  };

  /**
   * Function handler for swiping actions.
   */
  const onSwipe = (gestureName: string) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = SwipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        if (page !== pageNumber && !scrolling) {
          setPage(page + 1);
          flatListRef!.scrollToOffset({ animated: true, offset: 0 });
        }
        break;
      case SWIPE_RIGHT:
        if (page !== 0 && !scrolling) {
          flatListRef!.scrollToOffset({ animated: true, offset: 0 });
          setPage(page - 1);
        }
        break;
    }
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeArea}>
      <Swiper onSwipe={(direction: string) => onSwipe(direction)} config={globals.swipeConfig} style={styles.swiper}>
        <TopBarWithSearchBar searchAction={searchCans} clearSearch={clearSearch} />
        <If
          condition={pageNumber !== 0}
          then={
            <PageCounter>
              <PageNumberLabel>
                {t.PAGE} {page + 1} {t.OF} {pageNumber + 1}
              </PageNumberLabel>
            </PageCounter>
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
                    <EmptyListNotice adjustsFontSizeToFit numberOfLines={1}>
                      {t.EMPTY_LIST_NOTICE}
                    </EmptyListNotice>
                  }
                />
              }
              ref={ref => {
                flatListRef = ref;
              }}
              renderItem={({ item, index }) => (
                <CatalogueItem
                  link={item.link}
                  description={item.description}
                  title={item.title}
                  onPress={() => {
                    navigation.navigate('Details', { _catalogue: content, _index: page * 10 + index });
                  }}
                />
              )}
              keyExtractor={(item, index) => `${index}`}
            />
          }
          else={<Spinner />}
        />
        <ButtonFooter>
          <CatalogueButton
            disabled={page === 0}
            onPress={() => {
              setPage(page - 1);
              flatListRef!.scrollToOffset({ animated: true, offset: 0 });
            }}
          >
            {t.PREV_BUTTON.toUpperCase()}
          </CatalogueButton>
          <CatalogueButton
            disabled={page === pageNumber}
            onPress={() => {
              setPage(page + 1);
              flatListRef!.scrollToOffset({ animated: true, offset: 0 });
            }}
          >
            {t.NEXT_BUTTON.toUpperCase()}
          </CatalogueButton>
        </ButtonFooter>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'flex-start'
  },
  flatList: {
    backgroundColor: colors.white
  },
  safeArea: {
    flex: 1
  }
});

const PageCounter = styled.View`
  width: 100%;
  height: 30;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${colors.white};
`;

const PageNumberLabel = styled.Text`
  font-size: 18;
  font-weight: 600;
  color: ${colors.baliHai};
`;

const ButtonFooter = styled.View`
  width: ${globals.deviceWidth};
  height: 70;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const EmptyListNotice = styled.Text`
  color: ${colors.darkCharcoal};
  text-align: center;
  font-size: 19;
  padding-horizontal: 15;
  padding-vertical: 15;
`;

export default CatalogueScreen;
