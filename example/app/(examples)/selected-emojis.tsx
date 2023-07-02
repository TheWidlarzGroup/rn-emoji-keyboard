import { Button } from 'example/src/components/Button'
import { Results } from 'example/src/components/Results'
import React from 'react'
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard'

type CurrentlySelected = {
  name: EmojiType['name']
  emoji: EmojiType['emoji']
}
export default function () {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [currentlySelected, setCurrentlySelected] = React.useState<CurrentlySelected[]>([])

  const handlePick = (emoji: EmojiType) => {
    console.log(emoji)
    if (emoji.alreadySelected)
      setCurrentlySelected((prev) => prev.filter((a) => a.name !== emoji.name))
    else setCurrentlySelected((prev) => [...prev, { name: emoji.name, emoji: emoji.emoji }])
  }

  const currSelectedEmojis = currentlySelected.map((a) => a.emoji)
  const currSelectedNames = currentlySelected.map((a) => a.name)
  return (
    <>
      <Results label={currSelectedEmojis.join(' ')} />
      <Button onPress={() => setIsModalOpen(true)} label="Open" />

      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedEmojis={currSelectedNames}
        allowMultipleSelections
      />
    </>
  )
}
