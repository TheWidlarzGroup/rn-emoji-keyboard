import { Button } from 'example/src/components/Button'
import React from 'react'
import { Results } from 'example/src/components/Results'
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard'

export default function () {
  const [result, setResult] = React.useState<string>()
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const handlePick = (emoji: EmojiType) => {
    console.log(emoji)
    setResult(emoji.emoji)
    setIsModalOpen((prev) => !prev)
  }

  const deleteLastEmoji = () => {
    if (result) {
      let arrayFromString = Array.from(result)
      arrayFromString.pop()
      setResult(arrayFromString.join(''))
    }
  }

  return (
    <>
      <Results label={result} />
      <Button onPress={() => setIsModalOpen(true)} label="Open" />

      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        enableSearchBar
        enableCustomButton
        onCustomButtonPress={() => deleteLastEmoji()}
        allowMultipleSelections
        categoryPosition="bottom"
      />
    </>
  )
}
