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

export const EmojiCategory = ({ item }: { item: CategoryTypes }) => {
  const { width } = useWindowDimensions();
  const ctx = React.useContext(KeyboardContext);
  const numberOfColumns = React.useRef<number>(
    Math.floor(width / (ctx?.emojiSize ? ctx?.emojiSize : 0 + 16))
  );
  const [data, setData] = React.useState<EmojiType[]>([]);
  // console.log(width);

  React.useEffect(() => {
    const newData = emojisByGroup[item];
    const fillWithEmpty = new Array(
      numberOfColumns.current -
        (emojisByGroup[item].length % numberOfColumns.current)
    ).fill('a');
    setData([...newData, ...fillWithEmpty]);
  }, [item]);

  const getItemLayout = (_: EmojiType[] | null | undefined, index: number) => ({
    length: ctx?.emojiSize ? ctx?.emojiSize : 0,
    offset:
      (ctx?.emojiSize ? ctx?.emojiSize : 0) *
      Math.ceil(index / (ctx?.numberOfColumns ? ctx?.numberOfColumns : 1)),
    index,
  });

  const renderItem = React.useCallback(
    (props) => <SingleEmoji {...props} />,
    []
  );

  return (
    <View style={[styles.container, { width: width }]}>
      <Text style={styles.sectionTitle}>{item}</Text>
      <FlatList
        data={data}
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
    marginTop: 12,
  },
  sectionTitle: {
    opacity: 0.6,
    marginBottom: 12,
    marginLeft: 12,
  },
  footer: { height: 70 },
});
