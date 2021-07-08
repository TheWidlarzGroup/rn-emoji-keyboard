import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { EmojiType } from '../types';

export class SingleEmoji extends React.Component<{
  item: EmojiType;
  onPress: (emojiObject: EmojiType) => void;
  emojiSize: number;
}> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(this.props.item)}
        style={styles.container}
      >
        <View style={styles.iconContainer}>
          <Text style={{ fontSize: this.props.emojiSize }}>
            {this.props.item.emoji}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  iconContainer: { justifyContent: 'center', alignItems: 'center' },
});
