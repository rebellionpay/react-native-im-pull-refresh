function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useMemo } from 'react';
import { createNativeWrapper, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import usePullRefreshScrollView from './usePullRefreshScrollView';

function PullRefreshScrollViewComponent(props) {
  const {
    view,
    viewRef,
    loadingChildren,
    refreshing,
    onPullRefresh,
    power = 0.5,
    loaderHeight = 50,
    bounceOnPull = true,
    wrapperStyle,
    containerStyle
  } = props;
  const ScrollableView = useMemo(() => {
    // As reanimated does not provide an export type to the createAnimatedComponent function,
    // we set to any to avoid any break type in between the versions
    const ComponentWithGesture = createNativeWrapper(view, {
      disallowInterruption: true,
      shouldCancelWhenOutside: false
    });
    return Animated.createAnimatedComponent(ComponentWithGesture);
  }, [view]);
  const {
    ref: animatedRef,
    gestures,
    dragging,
    scrollHandler,
    scrollHeight
  } = usePullRefreshScrollView({ ...props,
    refreshing,
    callback: onPullRefresh,
    power,
    bounceOnPull,
    loaderHeight
  });
  const setRef = useCallback(viewComponentRef => {
    animatedRef.current = viewComponentRef;

    if (typeof viewRef === 'function') {
      viewRef === null || viewRef === void 0 ? void 0 : viewRef(viewComponentRef);
    }

    if (typeof viewRef === 'object') {
      viewRef.current = viewComponentRef;
    }
  }, [animatedRef, viewRef]);
  const style = useAnimatedStyle(() => {
    return {
      position: 'relative',
      transform: [{
        translateY: scrollHeight.value
      }]
    };
  });
  const contentStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: loaderHeight,
      justifyContent: 'center',
      alignItems: 'center'
    };
  }); // This props it is required to disable scrolling gesture to avoid mix gesture with pan

  const animatedProps = useAnimatedProps(() => {
    return {
      scrollEnabled: !dragging.value
    };
  });
  return /*#__PURE__*/React.createElement(GestureDetector, {
    gesture: gestures
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: wrapperStyle
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: contentStyle
  }, loadingChildren({
    animatedValue: scrollHeight
  })), /*#__PURE__*/React.createElement(Animated.View, {
    style: [style, containerStyle]
  }, /*#__PURE__*/React.createElement(ScrollableView, _extends({}, props, {
    ref: setRef,
    simultaneousHandlers: scrollHandler,
    animatedProps: animatedProps
  })))));
}

const PullRefreshScrollView = PullRefreshScrollViewComponent;
export default PullRefreshScrollView;
//# sourceMappingURL=index.js.map