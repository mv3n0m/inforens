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

export const getPgTimestamp = (dateTimeString?: string) => {
  const date = dateTimeString ? new Date(dateTimeString) : new Date()
  const offset = -date.getTimezoneOffset()
  const hours = Math.floor(offset / 60)
  const minutes = offset % 60
  const tz = `${hours >= 0 ? '+' : '-'}${String(hours).padStart(
    2,
    '0',
  )}:${String(minutes).padStart(2, '0')}`
  return `${date.toISOString().slice(0, -1)}${tz}`
}
