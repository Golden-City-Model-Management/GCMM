


import { useState, useCallback } from 'react'

export const useToggle = (initialValue: boolean) => {

  const [value, setValue] = useState(initialValue)

  const toggle = useCallback((newValue?: boolean) => {
    if (typeof newValue === 'undefined') {
      setValue(prev => !prev)
    } else {
      setValue(newValue)
    }
  }, [])

  return [value, toggle] as const
}

export default useToggle