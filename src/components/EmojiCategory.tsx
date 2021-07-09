import * as React from 'react';

import { StyleSheet, View, Text, FlatList } from 'react-native';
import type { EmojisByCategory, EmojiType } from 'src/types';
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

export const EmojiCategory = ({ item }: { item: EmojisByCategory }) => {
  const { onEmojiSelected, emojiSize, ...ctx } =
    React.useContext(KeyboardContext);

  const [empty, setEmpty] = React.useState<EmojiType[]>([]);

  React.useEffect(() => {
    if (item.data.length % ctx.numberOfColumns) {
      const fillWithEmpty = new Array(
        ctx.numberOfColumns - (item.data.length % ctx.numberOfColumns)
      ).fill(emptyEmoji);
      setEmpty(fillWithEmpty);
    }
  }, [ctx.numberOfColumns, item]);

  const getItemLayout = (_: EmojiType[] | null | undefined, index: number) => ({
    length: emojiSize ? emojiSize : 0,
    offset: emojiSize * Math.ceil(index / ctx.numberOfColumns),
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
    <View style={[styles.container, { width: ctx.width }]}>
      {!ctx.hideHeader && (
        <Text style={[styles.sectionTitle, ctx.headerStyles]}>
          {item.title}
        </Text>
      )}
      <FlatList
        data={[...item.data, ...empty]}
        keyExtractor={(emoji) => emoji.name}
        numColumns={ctx.numberOfColumns}
        renderItem={renderItem}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        ListFooterComponent={() => <View style={styles.footer} />}
        windowSize={1}
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
