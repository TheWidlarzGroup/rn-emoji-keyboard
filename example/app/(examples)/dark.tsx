import { Button } from 'example/src/components/Button'
import { Results } from 'example/src/components/Results'
import React from 'react'
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard'

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
        theme={{
          backdrop: '#16161888',
          knob: '#766dfc',
          container: '#282829',
          header: '#fff',
          skinTonesContainer: '#252427',
          category: {
            icon: '#766dfc',
            iconActive: '#fff',
            container: '#252427',
            containerActive: '#766dfc',
          },
        }}
      />
    </>
  )
}
