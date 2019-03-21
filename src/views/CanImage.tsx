import React, { Component } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';

import colors from '../constants/colors';

type Props = {
  albumImages: IImageInfo[];
};
class CanImage extends Component<Props> {
  private mounted: boolean = false;
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const { albumImages } = this.props;
    return <ImageViewer backgroundColor={colors.black} imageUrls={albumImages} />;
  }
}

export default CanImage;
