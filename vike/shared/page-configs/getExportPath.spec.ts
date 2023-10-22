import { getExportPath } from './getExportPath.js'
import { expect, describe, it } from 'vitest'

describe('getExportPath()', () => {
  it('works', () => {
    expect(t(['prop'])).toBe('export { prop }')
    expect(t(['default', 'prop'])).toBe('export default { prop }')
    expect(t(['prop', 'nested'])).toBe('export { prop { nested } }')
    expect(t(['prop', 'nested1', 'nested2'])).toBe('export { prop { nested1 { nested2 } } }')
    expect(t(['default', 'nested1', 'nested2'])).toBe('export default { nested1 { nested2 } }')
  })
  it('succint', () => {
    expect(t(['default'])).toBe(null)
    expect(t(['route'], 'route')).toBe(null)
    expect(t(['route'], 'route2')).toBe('export { route }')
  })
  it('edge cases work', () => {
    expect(t(['*'])).toBe(null)
  })
})

function t(fileExportPath: null | string[], configName = 'bla'): null | string {
  return getExportPath(fileExportPath, configName)
}