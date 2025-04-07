import { useCallback, useState } from 'react'

export const useToggle = (
  defaultValue: boolean = false
): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(defaultValue)

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return [isOpen, toggleModal, setIsOpen]
}
