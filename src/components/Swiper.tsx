/**
 * Based on https://github.com/glepur/react-native-swipe-gestures
 * Tweaks in order to achieve something
 */

import React, { Component } from 'react';
import { PanResponder, View, PanResponderInstance, GestureResponderEvent, PanResponderGestureState } from 'react-native';

export enum swipeDirections {
  SWIPE_UP = 'SWIPE_UP',
  SWIPE_DOWN = 'SWIPE_DOWN',
  SWIPE_LEFT = 'SWIPE_LEFT',
  SWIPE_RIGHT = 'SWIPE_RIGHT'
}

export enum swiperTypes {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
  CROSS = 'CROSS'
}

type Configuration = {
  velocityThreshold: number;
  directionalOffsetThreshold: number;
  gestureIsClickThreshold: number;
  swiperType: swiperTypes;
};

const swipeConfig: Configuration = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 25,
  swiperType: swiperTypes.CROSS
};

type Props = {
  config: Configuration;
  onSwipe?: (direction: swipeDirections, gestState: PanResponderGestureState) => any;
  onSwipeLeft?: (gestureState: PanResponderGestureState) => any;
  onSwipeRight?: (gestureState: PanResponderGestureState) => any;
  onSwipeUp?: (gestureState: PanResponderGestureState) => any;
  onSwipeDown?: (gestureState: PanResponderGestureState) => any;
};
class Swiper extends Component<Props> {
  private panResponder: PanResponderInstance | undefined;
  private swipeConfig: Configuration;

  constructor(props: Props) {
    super(props);
    this.swipeConfig = Object.assign(swipeConfig, props.config);
  }

  componentWillReceiveProps(props: Readonly<Props>, nextContext: any): void {
    this.swipeConfig = Object.assign(swipeConfig, props.config);
  }

  componentWillMount() {
    const responderEnd = this.handlePanResponderEnd;
    const shouldSetResponder = this.handleShouldSetPanResponder;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd
    });
  }

  handlePanResponderEnd = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const swipeDirection = this.getSwipeDirection(gestureState);
    swipeDirection && this.triggerSwipeHandlers(swipeDirection, gestureState);
  };

  handleShouldSetPanResponder = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    return event.nativeEvent.touches.length === 1 && !this.gestureIsClick(gestureState);
  };

  gestureIsClick = (gestureState: PanResponderGestureState) => {
    return (
      Math.abs(gestureState.dx) < this.swipeConfig.gestureIsClickThreshold &&
      Math.abs(gestureState.dy) < this.swipeConfig.gestureIsClickThreshold
    );
  };

  triggerSwipeHandlers = (swipeDirection: swipeDirections, gestureState: PanResponderGestureState) => {
    const { onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    onSwipe && onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        onSwipeUp && onSwipeUp(gestureState);
        break;
      case SWIPE_DOWN:
        onSwipeDown && onSwipeDown(gestureState);
        break;
    }
  };

  getSwipeDirection = (gestureState: PanResponderGestureState) => {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    const { dx, dy } = gestureState;

    if (this.swipeConfig.swiperType === swiperTypes.CROSS || this.swipeConfig.swiperType === swiperTypes.HORIZONTAL) {
      if (this.swipeConfig.swiperType === swiperTypes.CROSS && Math.abs(dx) > Math.abs(dy)) {
        if (this.isValidHorizontalSwipe(gestureState)) {
          return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
        }
      }
    }
    if (this.swipeConfig.swiperType != swiperTypes.HORIZONTAL) {
      if (this.isValidVerticalSwipe(gestureState)) {
        return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
      }
    }
    return null;
  };

  isValidSwipe = (
    velocity: number,
    velocityThreshold: number,
    directionalOffset: number,
    directionalOffsetThreshold: number
  ) => {
    return Math.abs(velocity) > velocityThreshold && Math.abs(directionalOffset) < directionalOffsetThreshold;
  };

  isValidHorizontalSwipe = (gestureState: PanResponderGestureState) => {
    const { vx, dy } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return this.isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  };

  isValidVerticalSwipe = (gestureState: PanResponderGestureState) => {
    const { vy, dx } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return this.isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  };

  render() {
    // @ts-ignore
    return <View {...this.props} {...this.panResponder.panHandlers} />;
  }
}

export default Swiper;
