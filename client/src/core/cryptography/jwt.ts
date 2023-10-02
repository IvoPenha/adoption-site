import jwt_decode from 'jwt-decode'
import jwtEncode from 'jwt-encode'

export const decodeToken = <T>(token: string): T => {
  const decodedToken = jwt_decode(token)
  return decodedToken as T
}
export const encodeToken = <T>(token: T): string => {
  const encodedToken = jwtEncode(token, '')
  return encodedToken
}