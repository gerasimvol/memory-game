export default function addId(a) {
  return a.map((item, i) => {
    item.id = i
    return item
  })
}
