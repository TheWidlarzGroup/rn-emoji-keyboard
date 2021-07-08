import * as React from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { CATEGORIES, CategoryTypes } from './types';
import { EmojiCategory } from './components/EmojiCategory';
import { KeyboardContext } from './KeyboardContext';
import { Categories } from './components/Categories';

export const EmojiKeyboard = () => {
  const { width } = useWindowDimensions();
  const ctx = React.useContext(KeyboardContext);

  const flatListRef = React.useRef<FlatList>(null);

  // const scrollX = React.useRef(new Animated.Value(0)).current;
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
  // const onScroll = Animated.event(
  //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
  //   {
  //     listener: ({
  //       nativeEvent: {
  //         contentOffset: { x },
  //       },
  //     }: NativeSyntheticEvent<NativeScrollEvent>) => {
  //       console.log(Math.round(x / width));
  //       ctx.setActiveCategoryIndex(Math.round(x / width));
  //       // Animated.spring(scrollNav, {
  //       //   toValue: (x / width) * (28 + 9),
  //       //   useNativeDriver: true,
  //       // }).start();
  //     },
  //     useNativeDriver: true,
  //   }
  // );
  React.useEffect(() => {
    Animated.spring(scrollNav, {
      toValue: ctx.activeCategoryIndex * (28 + 9),
      useNativeDriver: true,
    }).start();
  }, [ctx, scrollNav]);

  return (
    <View
      style={[styles.container, styles.containerShadow, ctx.containerStyles]}
    >
      <Animated.FlatList
        data={CATEGORIES}
        keyExtractor={(item: CategoryTypes) => item}
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
        scrollEnabled={false}
        // onScroll={onScroll}
        initialNumToRender={1}
        windowSize={7}
        maxToRenderPerBatch={1}
      />
      <Categories flatListRef={flatListRef} scrollNav={scrollNav} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  containerShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 10,
  },
});
