import * as React from 'react';

import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import EmojiPicker from '@jake7/react-native-emoji-keyboard';
import type { EmojiType } from 'lib/typescript/types';

export default function App() {
  const [result, setResult] = React.useState<string>();
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const handlePick = (emoji: EmojiType) => {
    console.log(emoji);
    setResult(emoji.emoji);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Result: {result}</Text>
      <TouchableOpacity onPress={() => setIsModalOpen(true)}>
        <Text style={styles.text}>Open</Text>
      </TouchableOpacity>

      {/* //////////////////////////////////////////// */}

      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* //////////////////////////////////////////// */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    margin: 64,
    fontSize: 18,
  },
});
