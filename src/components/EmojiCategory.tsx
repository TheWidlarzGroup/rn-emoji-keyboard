import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import emojisByGroup from 'unicode-emoji-json/data-by-group.json';
import type { CategoryTypes, EmojiType } from 'src/types';
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

export const EmojiCategory = ({ item }: { item: CategoryTypes }) => {
  const { width } = useWindowDimensions();
  const ctx = React.useContext(KeyboardContext);
  const numberOfColumns = React.useRef<number>(
    Math.floor(width / (ctx.emojiSize * 2))
  );
  const [empty, setEmpty] = React.useState<EmojiType[]>([]);

  React.useEffect(() => {
    console.log(
      numberOfColumns.current -
        (emojisByGroup[item].length % numberOfColumns.current)
    );
    const fillWithEmpty = new Array(
      numberOfColumns.current -
        (emojisByGroup[item].length % numberOfColumns.current)
    ).fill(emptyEmoji);
    setEmpty(fillWithEmpty);
  }, [item]);

  const getItemLayout = (_: EmojiType[] | null | undefined, index: number) => ({
    length: ctx.emojiSize ? ctx.emojiSize : 0,
    offset: ctx.emojiSize * Math.ceil(index / ctx.numberOfColumns),
    index,
  });

  const renderItem = React.useCallback(
    (props) => (
      <SingleEmoji
        {...props}
        onPress={() => ctx.onEmojiSelected(props.item)}
        emojiSize={ctx.emojiSize}
      />
    ),
    [ctx]
  );

  return (
    <View style={[styles.container, { width: width }]}>
      {!ctx.hideHeader && (
        <Text style={[styles.sectionTitle, ctx.headerStyles]}>{item}</Text>
      )}
      <FlatList
        data={[...emojisByGroup[item], ...empty]}
        keyExtractor={(emoji) => emoji.name}
        numColumns={numberOfColumns.current}
        renderItem={renderItem}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        ListFooterComponent={() => <View style={styles.footer} />}
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
