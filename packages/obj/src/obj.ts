export const extend = <
    T extends Record<string, any>,
    U extends Record<string, any>>(
    objFir: T,
    objSec: U): T & U => {
  return Object.assign({}, objFir, objSec)
}
