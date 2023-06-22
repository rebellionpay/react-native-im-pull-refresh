/// <reference types="react" />
import Animated from 'react-native-reanimated';
interface BasicScrollProps {
    onScroll?: (args: any) => void;
}
interface Props extends BasicScrollProps {
    refreshing: boolean;
    callback(): void;
    power: number;
    bounceOnPull: boolean;
    loaderHeight: number;
    scrollAnimatedValue?: Animated.SharedValue<number>;
}
declare function usePullRefreshScrollView({ refreshing, callback, power, bounceOnPull, loaderHeight, scrollAnimatedValue, ...viewProps }: Props): {
    ref: import("react").RefObject<any>;
    gestures: import("react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition").SimultaneousGesture;
    scrollHandler: (event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void;
    scrollHeight: Animated.SharedValue<number>;
    dragging: Animated.SharedValue<boolean>;
};
export default usePullRefreshScrollView;
