export default function(source, target) {
  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      source[key] = target[key]
    }
  }
}
