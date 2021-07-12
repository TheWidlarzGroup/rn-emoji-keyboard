import * as React from 'react';

import { StyleSheet, View, Text, FlatList } from 'react-native';
import type { EmojisByCategory, EmojiType } from '../types';
import { SingleEmoji } from './SingleEmoji';
import { KeyboardContext } from '../KeyboardContext';

const emptyEmoji = {
  emoji: '',
  name: 'blank emoji',
  slug: 'blank_emoji',
  skin_tone_support: false,
  unicode_version: '0',
  emoji_version: '0',
};

export const EmojiCategory = ({
  item: { title, data },
}: {
  item: EmojisByCategory;
}) => {
  const {
    onEmojiSelected,
    emojiSize,
    numberOfColumns,
    width,
    hideHeader,
    headerStyles,
    translation,
  } = React.useContext(KeyboardContext);

  const [empty, setEmpty] = React.useState<EmojiType[]>([]);

  React.useEffect(() => {
    if (data.length % numberOfColumns) {
      const fillWithEmpty = new Array(
        numberOfColumns - (data.length % numberOfColumns)
      ).fill(emptyEmoji);
      setEmpty(fillWithEmpty);
    }
  }, [numberOfColumns, data]);

  const getItemLayout = (_: EmojiType[] | null | undefined, index: number) => ({
    length: emojiSize ? emojiSize : 0,
    offset: emojiSize * Math.ceil(index / numberOfColumns),
    index,
  });

  const renderItem = React.useCallback(
    (props) => (
      <SingleEmoji
        {...props}
        onPress={() => onEmojiSelected(props.item)}
        emojiSize={emojiSize}
      />
    ),
    [onEmojiSelected, emojiSize]
  );

  return (
    <View style={[styles.container, { width: width }]}>
      {!hideHeader && (
        <Text style={[styles.sectionTitle, headerStyles]}>
          {translation[title]}
        </Text>
      )}
      <FlatList
        data={[...data, ...empty]}
        keyExtractor={(emoji) => emoji.name}
        numColumns={numberOfColumns}
        renderItem={renderItem}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        ListFooterComponent={() => <View style={styles.footer} />}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  sectionTitle: {
    opacity: 0.6,
    marginBottom: 6,
    marginLeft: 12,
  },
  footer: { height: 70 },
});
