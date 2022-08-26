
import { createContext, ReactNode, useCallback, useMemo, useState } from "react";


interface User {
  _id: string, name: string, avatar: string,
  email: string, userName: string, role: string
}
const initialUserState = {
  user: {
    _id: '',
    name: '',
    avatar: '',
    email: '',
    userName: '',
    role: '',    
  },
  updateUser: (user: User) => undefined
}

export const UserContext = createContext({...initialUserState})

const UserProvider = ({ children } : {
  children: ReactNode
}) => {

  const [ user, setUser ] = useState(initialUserState.user)

  const updateUser = useCallback((user) => {
    setUser(user)
    return undefined
  }, [])

  const value = {
    user,
    updateUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider