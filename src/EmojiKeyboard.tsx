import * as React from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { CATEGORIES, CategoryTypes } from './types';
import { EmojiCategory } from './components/EmojiCategory';
import { KeyboardContext } from './KeyboardContext';
import { Categories } from './components/Categories';

export const EmojiKeyboard = () => {
  const { width } = useWindowDimensions();
  const ctx = React.useContext(KeyboardContext);

  const flatListRef = React.useRef<FlatList>(null);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollNav = React.useRef(new Animated.Value(0)).current;

  const getItemLayout = (
    _: CategoryTypes[] | null | undefined,
    index: number
  ) => ({
    length: width,
    offset: width * index,
    index,
  });

  const renderItem = React.useCallback(
    (props) => <EmojiCategory {...props} />,
    []
  );
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      listener: ({
        nativeEvent: {
          contentOffset: { x },
        },
      }: NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.spring(scrollNav, {
          toValue: (x / width) * (28 + 9),
          useNativeDriver: false,
        }).start();
      },
      useNativeDriver: false,
    }
  );

  return (
    <View style={[styles.container, ctx.containerStyles]}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        removeClippedSubviews={true}
        ref={flatListRef}
        onScrollToIndexFailed={() => {}}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        onScroll={onScroll}
      />
      <Categories flatListRef={flatListRef} scrollNav={scrollNav} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
});
