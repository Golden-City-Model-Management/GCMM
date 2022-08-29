
import React, { createContext, useCallback, useState } from 'react'

const initialSearchContextValue = {
  searchTerm: '',
  updateSearchTerm: (newTerm: string) => {}
}

export const ModelSearchContext = createContext(initialSearchContextValue)

const ModelSearchProvider = ({ children }: { children: React.ReactNode}) => {

  const [searchTerm, setSearchTerm] = useState('')

  const updateSearchTerm = useCallback((newTerm) => {
      setSearchTerm(newTerm)
    },[])

  const value = {
    searchTerm,
    updateSearchTerm
  }
  return (
    <ModelSearchContext.Provider value={value}>
      {children}
    </ModelSearchContext.Provider>
  )
}
export default ModelSearchProvider