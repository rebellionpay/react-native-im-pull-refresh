import React, { MutableRefObject } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
declare type ViewComponentProps<T> = StyleProp<T> & object;
declare type ViewRef<T> = {
    viewRef?: MutableRefObject<T | undefined>;
};
declare type ComponentProps<T> = ViewComponentProps<T> & ViewRef<T> & {
    view: React.ComponentType<T>;
    refreshing: boolean;
    power?: number;
    bounceOnPull?: boolean;
    onPullRefresh(): void;
    loadingChildren({ animatedValue, }: {
        animatedValue: Animated.SharedValue<number>;
    }): React.ReactElement;
    loaderHeight?: number;
    wrapperStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    scrollAnimatedValue?: Animated.SharedValue<number>;
};
declare type ComponentWithChildrenProps<T> = ComponentProps<T> & {
    children: React.ReactElement | React.ReactElement[];
};
declare function PullRefreshScrollViewComponent<T extends object>(props: ComponentProps<T> | ComponentWithChildrenProps<T>): JSX.Element;
declare const PullRefreshScrollView: typeof PullRefreshScrollViewComponent;
export default PullRefreshScrollView;
