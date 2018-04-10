export default function double(a) {
  const aCopy = a.map(item => Object.assign({}, item))
  return a.concat(aCopy)
}
