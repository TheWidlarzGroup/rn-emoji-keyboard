const json = require('unicode-emoji-json/data-by-group.json')
const fs = require('fs')
const emojisWithKeywords = require('emojilib')

const emojis = []

for (const category of json) {
  let newCategory = {}
  for (const [key, value] of Object.entries(category)) {
    if (key === 'slug') {
      newCategory = {
        title: value,
      }
    }

    if (key === 'emojis') {
      newCategory = {
        ...newCategory,
        data: value.map((emoji) => {
          return {
            emoji: emoji.emoji,
            name: emoji.name,
            v: emoji.unicode_version,
            toneEnabled: emoji.skin_tone_support,
            keywords: emojisWithKeywords[emoji.emoji],
          }
        }),
      }
      emojis.push(newCategory)
      newCategory = {}
    }
  }
}

fs.writeFile('./src/assets/emojis.json', JSON.stringify(emojis), function (err) {
  if (err) return console.log(err)
  console.log('emojis.json successfully saved to assets folder')
})
