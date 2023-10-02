import { useState } from 'react'

import * as Cache  from '../core/cache/local-storage'

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string>()

  const saveUserToken = (accessToken: string) => {
    Cache.set({
      key: 'userToken',
      value: accessToken
    })
    setAccessToken(accessToken)
  }

  return {
    setAccessToken: saveUserToken,
    accessToken
  }
}
