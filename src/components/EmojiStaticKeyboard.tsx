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
import { SearchBar } from './SearchBar';

export const EmojiStaticKeyboard = () => {
  const { width } = useWindowDimensions();
  const {
    activeCategoryIndex,
    containerStyles,
    onCategoryChangeFailed,
    disabledCategory,
    categoryPosition,
    enableSearchBar,
    searchPhrase,
    setActiveCategoryIndex,
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

  const getData = React.useCallback(() => {
    const enabledCategories = emojisByGroup.filter((category) => {
      const title = category.title as CategoryTypes;
      return !disabledCategory.includes(title);
    });
    enabledCategories.push({
      title: 'search',
      data: emojisByGroup
        .map((group) => group.data)
        .flat()
        .filter((emoji) => {
          return emoji.name.toLowerCase().includes(searchPhrase.toLowerCase());
        }),
    });
    return enabledCategories;
  }, [disabledCategory, searchPhrase]);

  React.useEffect(() => {
    if (searchPhrase !== '') {
      flatListRef.current?.scrollToEnd();
      setActiveCategoryIndex(getData().length - 1);
    }
  }, [getData, searchPhrase, setActiveCategoryIndex]);
  return (
    <View
      style={[
        styles.container,
        styles.containerShadow,
        categoryPosition === 'top' && styles.containerReverse,
        containerStyles,
      ]}
    >
      {enableSearchBar && <SearchBar flatListRef={flatListRef} />}
      <Animated.FlatList
        data={getData()}
        extraData={searchPhrase}
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
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  containerReverse: { flexDirection: 'column-reverse' },
  containerShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 10,
  },
});
