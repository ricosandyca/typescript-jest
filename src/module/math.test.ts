import { add, mul } from './math'

describe('Simple math module testing', () => {

  test('Add function', () => {
    expect(add(7,8,9)).toBe(7 + 8 + 9)
    expect(add(1,2)).not.toBe(8)
  })

  test('Multiplication function', () => {
    expect(mul(3,4,7)).toBe(3 * 4 * 7)
    expect(mul(4,3)).not.toBe(11)
  })

})
