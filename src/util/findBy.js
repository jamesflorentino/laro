export default function (list, key, value) {
  return list.find(e => e[key] === value)
}
