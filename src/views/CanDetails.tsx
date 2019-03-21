import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { CanState } from '../state/modules/cans/types';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { RootState } from '../state/store';
import { getCanState } from '../state/modules/cans/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../state/modules/cans/actions';
import colors from '../constants/colors';
// @ts-ignore
import styled from 'styled-components';

type PropsFromState = CanState;

type Props = PropsFromState;
class CanDetails extends Component<Props> {
  render() {
    const { can } = this.props;
    return (
      <DetailsWrapper>
        <TouchableOpacity>
          <FastImage
            source={{ uri: can.link, priority: FastImage.priority.normal }}
            style={{ width: 220, height: 300, marginTop: 20 }}
          />
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
      </DetailsWrapper>
    );
  }
}

const BoldAttributeName = styled.Text`
  font-weight: bold;
  color: ${colors.gray20};
  font-size: 16;
`;

const AttributeValue = styled.Text`
  font-size: 16;
  color: ${colors.gray20};
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
  color: ${colors.gray20};
  margin-vertical: 10;
`;

const InfoText = styled.Text`
  font-size: 22;
  color: ${colors.gray20};
  text-align: center;
`;

const DetailsWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-horizontal: 10;
`;

const mapStateToProps = (state: RootState) => getCanState(state);

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanDetails);
