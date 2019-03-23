import React, { FC } from 'react';
import FastImage from 'react-native-fast-image';
// @ts-ignore
import styled from 'styled-components';

import colors from '../constants/colors';

type Props = {
  link: string;
  title: string;
  description: string;
  onPress: () => void;
};

const CatalogueItem: FC<Props> = ({ link, title, description, onPress }) => (
  <ItemWrapper onPress={onPress}>
    <FastImage source={{ uri: link, priority: FastImage.priority.normal }} style={{ width: 60, height: 100 }} />
    <TextWrapper>
      <Title adjustsFontSizeToFit numberOfLines={1}>
        {title}
      </Title>
      <Description>{description}</Description>
    </TextWrapper>
  </ItemWrapper>
);

const Title = styled.Text`
  text-align: center;
  color: ${colors.darkCharcoal};
  margin-bottom: 5;
  font-size: 23;
  font-weight: 600;
  text-decoration-line: underline;
`;

const Description = styled.Text`
  text-align: left;
  color: ${colors.slateGray};
  font-size: 12;
`;

const TextWrapper = styled.View`
  align-items: flex-start;
  padding-left: 20;
  flex-wrap: wrap;
  flex: 1;
`;

const ItemWrapper = styled.TouchableOpacity`
  background-color: ${colors.white};
  flex-direction: row;
  padding-vertical: 10;
  padding-horizontal: 10;
  border-top-width: 1;
  border-top-color: ${colors.gainsboro};
  position: relative;
`;

export default CatalogueItem;
