const add: (...args: Array<number>) => number = (...args) => {
  return args.reduce((state, currentValue) => {
    return state += currentValue
  }, 0)
}

const mul: (...args: Array<number>) => number = (...args) => {
  return args.reduce((state, currentValue) => {
    return state *= currentValue
  }, 1)
}

export { add, mul }
