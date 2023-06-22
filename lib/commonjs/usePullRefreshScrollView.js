"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactNativeReanimated = require("react-native-reanimated");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

function usePullRefreshScrollView(_ref) {
  let {
    refreshing,
    callback,
    power,
    bounceOnPull,
    loaderHeight,
    scrollAnimatedValue,
    ...viewProps
  } = _ref;
  const ref = (0, _reactNativeReanimated.useAnimatedRef)();
  const scrollY = (0, _reactNativeReanimated.useSharedValue)(0);
  const scrollHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const startY = (0, _reactNativeReanimated.useSharedValue)(0);
  const dragging = (0, _reactNativeReanimated.useSharedValue)(false);
  const onScrollProxy = (0, _react.useMemo)(() => viewProps.onScroll, [viewProps.onScroll]);

  const panGesture = _reactNativeGestureHandler.Gesture.Pan().enabled(!refreshing).simultaneousWithExternalGesture(ref).onUpdate(e => {
    const scroll = scrollY.value;
    let posY = e.translationY - startY.value; // is on top and is intention to pull

    if (scroll <= 0 && posY > 0) {
      if (!dragging.value) {
        startY.value = e.translationY;
      }

      dragging.value = true;
    } // is not on top and is intention scroll


    if (scroll >= 0 && posY < 0) {
      if (dragging.value) {
        startY.value = e.translationY;
      }

      dragging.value = false;
    }

    posY = e.translationY - startY.value;

    if (dragging.value) {
      let newPosY = posY * power; // when bounceOnPull is disabled we limit the loaderHeight based on the prop

      if (!bounceOnPull && newPosY >= loaderHeight) {
        scrollHeight.value = loaderHeight;
        return;
      } // avoid going negative values since we want to go positive only


      scrollHeight.value = newPosY < 0 ? 0 : newPosY;
    } else {
      scrollHeight.value = (0, _reactNativeReanimated.withTiming)(0);
    }
  }).onEnd(() => {
    if (scrollHeight.value >= loaderHeight * 0.75) {
      (0, _reactNativeReanimated.runOnJS)(callback)();
    } else {
      scrollHeight.value = (0, _reactNativeReanimated.withTiming)(0);
    }

    startY.value = 0;
    dragging.value = false;
  });

  const gestures = _reactNativeGestureHandler.Gesture.Simultaneous(panGesture);

  const scrollHandler = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
    onScroll: event => {
      'worklet';

      if (scrollAnimatedValue) {
        scrollAnimatedValue.value = event.contentOffset.y;
      }

      onScrollProxy && onScrollProxy(event);
      scrollY.value = event.contentOffset.y;
    }
  }); // effect for controlled loading state

  (0, _react.useEffect)(() => {
    if (refreshing) {
      scrollHeight.value = (0, _reactNativeReanimated.withTiming)(loaderHeight);
      return;
    }

    scrollHeight.value = (0, _reactNativeReanimated.withTiming)(0);
  }, [refreshing, loaderHeight, scrollHeight]);
  return {
    ref,
    gestures,
    scrollHandler,
    scrollHeight,
    dragging
  };
}

var _default = usePullRefreshScrollView;
exports.default = _default;
//# sourceMappingURL=usePullRefreshScrollView.js.map