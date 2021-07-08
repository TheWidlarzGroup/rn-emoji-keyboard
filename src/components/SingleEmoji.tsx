import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardContext } from '../KeyboardContext';
import type { EmojiType } from '../types';

export const SingleEmoji = ({ item }: { item: EmojiType }) => {
  const ctx = React.useContext(KeyboardContext);
  return (
    <TouchableOpacity
      onPress={() => ctx?.onEmojiSelected(item)}
      style={styles.container}
    >
      <View>
        <Text style={{ fontSize: ctx?.emojiSize }}>{item.emoji}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
});
