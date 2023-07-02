import { Button } from 'example/src/components/Button'
import { Results } from 'example/src/components/Results'
import React from 'react'
import EmojiPicker, {
  emojisByCategory,
  type EmojiType,
  type EmojisByCategory,
} from 'rn-emoji-keyboard'

const getCustomEmojis = () => {
  const newEmojiSet: EmojisByCategory[] = []
  for (const [, value] of Object.entries(emojisByCategory)) {
    const newData = value.data.filter((emoji) => parseFloat(emoji.v) === 11)
    newEmojiSet.push({
      title: value.title,
      data: newData,
    })
  }
  return newEmojiSet
}

export default function () {
  const [result, setResult] = React.useState<string>()
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const handlePick = (emoji: EmojiType) => {
    console.log(emoji)
    setResult(emoji.emoji)
    setIsModalOpen((prev) => !prev)
  }
  return (
    <>
      <Results label={result} />
      <Button onPress={() => setIsModalOpen(true)} label="Open" />

      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        emojisByCategory={getCustomEmojis()}
      />
    </>
  )
}
