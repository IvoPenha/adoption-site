type GetStorageInput = {
  key: string
}
export type GetStorage = <T = any>(input: GetStorageInput) => T

type SetStorageInput = {
  key: string
  value: any
}
export type SetStorage = (input: SetStorageInput) => void

type RemoveStorageInput = {
  key: string
}
export type RemoveStorage = (input: RemoveStorageInput) => void

export const get: GetStorage = ({ key }) => {
  const value = localStorage.getItem(key)

  if (value) {
    return JSON.parse(value)
  }
}

export const set: SetStorage = ({ key, value }) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const remove: RemoveStorage = ({ key }) => {
  localStorage.removeItem(key)
}
