import { ReactNode, createContext, useState } from 'react'
import * as Cache from '../core/cache/local-storage'

export type AuthContextProps = {
  accessToken?: string
  saveAccessToken: (accessToken: string) => void
  getCurrentAccount: <T>() => T | undefined
  removeAccessToken: () => void
}

export type AuthProviderProps = {
  getCurrentAccount: <T = any>() => T | undefined
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({
  getCurrentAccount,
  children
}: AuthProviderProps) => {
  const getAccessToken = () => {
    const accessToken = Cache.get({
      key: 'userToken'
    })
    return accessToken
  }

  const [accessToken, setAccessToken] = useState<string | undefined>(
    getAccessToken()
  )

  const saveAccessToken = (accessToken: string | undefined) => {
    accessToken &&
      Cache.set({
        key: 'userToken',
        value: accessToken
      })
    setAccessToken(accessToken)
  }

  const removeAccessToken = () => {
    Cache.remove({
      key: 'userToken'
    })
    setAccessToken(undefined)
  }


  return (
    <AuthContext.Provider
      value={{
        accessToken,
        saveAccessToken,
        getCurrentAccount,
        removeAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
