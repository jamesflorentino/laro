import isFunction from './isFunction'

export default function(obj, fn, context) {
  if (!isFunction(fn)) {
    return
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(context, key, obj[key])
    }
  }
}
