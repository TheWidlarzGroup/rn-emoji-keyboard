import * as React from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  ViewStyle,
  useWindowDimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { CATEGORIES, CategoryTypes, EmojiType } from './types';
import { EmojiCategory } from './components/EmojiCategory';
import { KeyboardContext } from './KeyboardContext';
import { Categories } from './components/Categories';

type EmojiKeyboardProps = {
  onEmojiSelected: (emoji: EmojiType) => void;
  containerStyles?: ViewStyle;
  numberOfColumns?: number;
  emojiSize?: number;
};

export const EmojiKeyboard = ({
  onEmojiSelected,
  containerStyles,
  numberOfColumns = 7,
  emojiSize = 28,
}: EmojiKeyboardProps) => {
  const { width } = useWindowDimensions();
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
    <KeyboardContext.Provider
      value={{
        onEmojiSelected,
        numberOfColumns,
        emojiSize,
      }}
    >
      <View style={[styles.container, containerStyles]}>
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
    </KeyboardContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
});
