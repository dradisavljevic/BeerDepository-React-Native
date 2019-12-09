/**
 * Based on https://github.com/glepur/react-native-swipe-gestures
 * Tweaks in order to make a more applicable swiper component.
 */

import React, { useState, useEffect } from 'react';
import {
  PanResponder,
  View,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  ViewStyle,
  StyleProp
} from 'react-native';

export enum SwipeDirections {
  SWIPE_UP = 'SWIPE_UP',
  SWIPE_DOWN = 'SWIPE_DOWN',
  SWIPE_LEFT = 'SWIPE_LEFT',
  SWIPE_RIGHT = 'SWIPE_RIGHT'
}

export enum SwiperTypes {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
  COMBINED = 'COMBINED'
}

type Configuration = {
  velocityThreshold: number;
  directionalOffsetThreshold: number;
  gestureIsClickThreshold: number;
  swiperType: SwiperTypes;
};

const swipeConfig: Configuration = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 25,
  swiperType: SwiperTypes.COMBINED
};

type Props = {
  config: Configuration;
  onSwipe?: (direction: SwipeDirections, gestState: PanResponderGestureState) => any;
  onSwipeLeft?: (gestureState: PanResponderGestureState) => any;
  onSwipeRight?: (gestureState: PanResponderGestureState) => any;
  onSwipeUp?: (gestureState: PanResponderGestureState) => any;
  onSwipeDown?: (gestureState: PanResponderGestureState) => any;
  style: StyleProp<ViewStyle>;
};
const Swiper = props => {
  const [panResponder, setPanResponder] = useState({});
  const [swipeConfig, setSwipeConfig] = useState({});

  const initialize = () => {
    const responderEnd = this.handlePanResponderEnd;
    const shouldSetResponder = this.handleShouldSetPanResponder;
    const pr = PanResponder.create({
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd
    });
    setSwipeConfig(Object.assign(swipeConfig, props.config));
    setPanResponder(pr);
  };

  useEffect(() => {
    initialize();
  }, []);

  handlePanResponderEnd = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const swipeDirection = getSwipeDirection(gestureState);
    swipeDirection && triggerSwipeHandlers(swipeDirection, gestureState);
  };

  handleShouldSetPanResponder = (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    return event.nativeEvent.touches.length === 1 && !gestureIsClick(gestureState);
  };

  gestureIsClick = (gestureState: PanResponderGestureState) => {
    if (swipeConfig.swiperType === SwiperTypes.HORIZONTAL) {
      return Math.abs(gestureState.dx) < swipeConfig.gestureIsClickThreshold;
    } else if (swipeConfig.swiperType === SwiperTypes.VERTICAL) {
      return Math.abs(gestureState.dy) < swipeConfig.gestureIsClickThreshold;
    } else {
      return (
        Math.abs(gestureState.dx) < swipeConfig.gestureIsClickThreshold &&
        Math.abs(gestureState.dy) < swipeConfig.gestureIsClickThreshold
      );
    }
  };

  triggerSwipeHandlers = (swipeDirection: SwipeDirections, gestureState: PanResponderGestureState) => {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = SwipeDirections;
    props.onSwipe && props.onSwipe(swipeDirection, gestureState);
    switch (swipeDirection) {
      case SWIPE_LEFT:
        props.onSwipeLeft && props.onSwipeLeft(gestureState);
        break;
      case SWIPE_RIGHT:
        props.onSwipeRight && props.onSwipeRight(gestureState);
        break;
      case SWIPE_UP:
        props.onSwipeUp && props.onSwipeUp(gestureState);
        break;
      case SWIPE_DOWN:
        props.onSwipeDown && props.onSwipeDown(gestureState);
        break;
    }
  };

  getSwipeDirection = (gestureState: PanResponderGestureState) => {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = SwipeDirections;
    const { dx, dy } = gestureState;

    if (swipeConfig.swiperType === SwiperTypes.COMBINED || swipeConfig.swiperType === SwiperTypes.HORIZONTAL) {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (isValidHorizontalSwipe(gestureState)) {
          return dx > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
        }
      }
    }
    if (swipeConfig.swiperType !== SwiperTypes.HORIZONTAL) {
      if (isValidVerticalSwipe(gestureState)) {
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
    const { velocityThreshold, directionalOffsetThreshold } = swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  };

  isValidVerticalSwipe = (gestureState: PanResponderGestureState) => {
    const { vy, dx } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  };

  // @ts-ignore
  return <View {...props} {...panResponder.panHandlers} />;
};

export default Swiper;
