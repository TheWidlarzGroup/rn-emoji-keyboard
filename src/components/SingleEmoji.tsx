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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: this.props.emojiSize }}>
            {this.props.item.emoji}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// export const SingleEmoji = ({
//   item,
//   onPress,
//   emojiSize,
// }: {
//   item: EmojiType;
//   onPress: (emojiObject: EmojiType) => void;
//   emojiSize: number;
// }) => {
//   if (item.slug !== 'blank_emoji')
//     return (
//       <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
//         <View>
//           <Text style={{ fontSize: emojiSize }}>{item.emoji}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   else return <View style={styles.container} />;
// };

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
});
