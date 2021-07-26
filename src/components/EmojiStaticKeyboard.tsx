import * as React from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  Animated,
} from 'react-native';
import type { CategoryTypes, EmojisByCategory } from '../types';
import { EmojiCategory } from './EmojiCategory';
import { KeyboardContext } from '../contexts/KeyboardContext';
import { Categories } from './Categories';
import emojisByGroup from '../assets/emojis.json';

export const EmojiStaticKeyboard = () => {
  const { width } = useWindowDimensions();
  const {
    activeCategoryIndex,
    containerStyles,
    onCategoryChangeFailed,
    disabledCategory,
  } = React.useContext(KeyboardContext);

  const flatListRef = React.useRef<FlatList>(null);

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
  React.useEffect(() => {
    Animated.spring(scrollNav, {
      toValue: activeCategoryIndex * (28 + 9),
      useNativeDriver: true,
    }).start();
  }, [activeCategoryIndex, scrollNav]);

  return (
    <View style={[styles.container, styles.containerShadow, containerStyles]}>
      <Animated.FlatList
        data={emojisByGroup.filter((category) => {
          const title = category.title as CategoryTypes;
          return !disabledCategory.includes(title);
        })}
        keyExtractor={(item: EmojisByCategory) => item.title}
        renderItem={renderItem}
        removeClippedSubviews={true}
        ref={flatListRef}
        onScrollToIndexFailed={onCategoryChangeFailed}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        scrollEnabled={false}
        initialNumToRender={1}
        windowSize={2}
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
