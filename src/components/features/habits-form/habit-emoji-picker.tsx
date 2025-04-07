'use client'

import EmojiPicker, { EmojiStyle, SkinTones } from 'emoji-picker-react'
import { useState } from 'react'
import { useToggle } from '~/hooks/use-toggle'

export const HabitEmojiPicker = () => {
  const [isOpen, , setIsOpen] = useToggle()
  const [icon, setIcon] = useState<string | null>(null)

  return (
    <button onClick={() => setIsOpen(true)} type='button' className='w-full'>
      <p>Icon</p>
      <div>{icon}</div>
      <EmojiPicker
        lazyLoadEmojis
        open={isOpen}
        width='100%'
        onEmojiClick={(emoji) => setIcon(emoji.emoji)}
        defaultSkinTone={SkinTones.NEUTRAL}
        emojiStyle={EmojiStyle.APPLE}
        skinTonesDisabled
        previewConfig={{ showPreview: false }}
      />
    </button>
  )
}
