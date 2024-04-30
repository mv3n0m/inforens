export const removeDuplicates = (array: Array<any>) => {
  const seen = new Set()
  return array.filter((item) => {
    const serializedItem = JSON.stringify(item)
    if (!seen.has(serializedItem)) {
      seen.add(serializedItem)
      return true
    }
    return false
  })
}
