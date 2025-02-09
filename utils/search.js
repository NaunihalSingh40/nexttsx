let timer

export const debounce = (fn, delay) => {
  return function () {
    let context,
      args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
