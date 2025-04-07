import { Check } from 'lucide-react'
import { useState } from 'react'
import { HABIT_COLORS } from '~/constants/habit'

export const HabitColor = () => {
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0])

  return (
    <div>
      <label className='font-semibold inline-flex mb-1'>Habit color</label>
      <div
        style={{ gridTemplateColumns: `repeat(${HABIT_COLORS.length}, 1fr)` }}
        className='overflow-x-auto grid gap-3 hide-scrollbar'>
        {HABIT_COLORS.map((color) => (
          <button
            type='button'
            key={color}
            style={{ backgroundColor: color }}
            className='grid place-items-center size-10 rounded-full'
            onClick={() => setSelectedColor(color)}>
            {selectedColor === color && <Check color='#ffffff' />}
          </button>
        ))}
      </div>
    </div>
  )
}
