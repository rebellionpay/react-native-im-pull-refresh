"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _usePullRefreshScrollView = _interopRequireDefault(require("./usePullRefreshScrollView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  const ScrollableView = (0, _react.useMemo)(() => {
    // As reanimated does not provide an export type to the createAnimatedComponent function,
    // we set to any to avoid any break type in between the versions
    const ComponentWithGesture = (0, _reactNativeGestureHandler.createNativeWrapper)(view, {
      disallowInterruption: true,
      shouldCancelWhenOutside: false
    });
    return _reactNativeReanimated.default.createAnimatedComponent(ComponentWithGesture);
  }, [view]);
  const {
    ref: animatedRef,
    gestures,
    dragging,
    scrollHandler,
    scrollHeight
  } = (0, _usePullRefreshScrollView.default)({ ...props,
    refreshing,
    callback: onPullRefresh,
    power,
    bounceOnPull,
    loaderHeight
  });
  const setRef = (0, _react.useCallback)(viewComponentRef => {
    animatedRef.current = viewComponentRef;

    if (typeof viewRef === 'function') {
      viewRef === null || viewRef === void 0 ? void 0 : viewRef(viewComponentRef);
    }

    if (typeof viewRef === 'object') {
      viewRef.current = viewComponentRef;
    }
  }, [animatedRef, viewRef]);
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      position: 'relative',
      transform: [{
        translateY: scrollHeight.value
      }]
    };
  });
  const contentStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: loaderHeight,
      justifyContent: 'center',
      alignItems: 'center'
    };
  }); // This props it is required to disable scrolling gesture to avoid mix gesture with pan

  const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    return {
      scrollEnabled: !dragging.value
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.GestureDetector, {
    gesture: gestures
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: wrapperStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: contentStyle
  }, loadingChildren({
    animatedValue: scrollHeight
  })), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [style, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(ScrollableView, _extends({}, props, {
    ref: setRef,
    simultaneousHandlers: scrollHandler,
    animatedProps: animatedProps
  })))));
}

const PullRefreshScrollView = PullRefreshScrollViewComponent;
var _default = PullRefreshScrollView;
exports.default = _default;
//# sourceMappingURL=index.js.map