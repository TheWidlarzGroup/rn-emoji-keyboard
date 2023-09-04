import { Results } from 'example/src/components/Results'
import React from 'react'
import { EmojiKeyboard, type EmojiType } from 'rn-emoji-keyboard'

export default function () {
  const [result, setResult] = React.useState<string>()

  const handlePick = (emoji: EmojiType) => {
    console.log(emoji)
    setResult(emoji.emoji)
  }
  return (
    <>
      <Results label={result} />

      <EmojiKeyboard onEmojiSelected={handlePick} />
    </>
  )
}
