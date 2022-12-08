import FastImage from 'react-native-fast-image';
import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

type Props = {
  link: string;
  title: string;
  description: string;
  onPress: () => void;
};

/**
 * Functional component representing item in catalogue.
 */
const CatalogueItem: FC<Props> = ({link, title, description, onPress}) => (
  <TouchableOpacity style={styles.itemWrapperStyle} onPress={onPress}>
    <FastImage
      source={{uri: link, priority: FastImage.priority.normal}}
      style={styles.image}
    />
    <View style={styles.textWrapperStyle}>
      <Text style={styles.titleStyle} adjustsFontSizeToFit numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.descriptionStyle}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 100,
    borderRadius: 10,
  },
  titleStyle: {
    textAlign: 'center',
    color: colors.darkCharcoal,
    marginBottom: 5,
    fontSize: 23,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  descriptionStyle: {
    textAlign: 'left',
    color: colors.slateGray,
    fontSize: 12,
  },
  textWrapperStyle: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    flexWrap: 'wrap',
    flex: 1,
  },
  itemWrapperStyle: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gainsboro,
    position: 'relative',
  },
});

export default CatalogueItem;
