---
sidebar_position: 3
title: Dark Mode
---

We do not provide a prop that will directly enable dark mode, but with the ability to adjust theme, you can easily achieve it
using theme prop.

```tsx
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
```

The effect of the above code.
![The effect of the above code](../../../assets/img/dark-mode-preview.jpg)
