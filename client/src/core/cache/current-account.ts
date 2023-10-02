import  * as Cache from '../cache/local-storage'
import * as Cryptography from '../cryptography/jwt'
import { CommonUsuarioClaims } from '../../types/CommonUsuario'

export const getCurrentAccount = <T>(): T | undefined => {
  const userToken = Cache.get({ key: 'userToken' })
  if (userToken) {
    const decodeToken = Cryptography.decodeToken<T>(userToken)
    
    const dateNow = new Date()
    const expirationToken =
    (decodeToken as unknown as CommonUsuarioClaims).expires_in

    if (expirationToken < dateNow.getTime()) {
      Cache.remove({ key: 'userToken' })
      Cache.remove({ key: 'token' })
      return
    }

    return decodeToken as T
  }
}
