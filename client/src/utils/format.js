/**
 * Format name
 * @param {string} name 
 * @returns 
 */
export function formatName (name) {
  const names = name.split(" ")

  return (names.map(subname => subname[0].toUpperCase() + subname.substring(1).toLowerCase())).join(" ")
}

export function formatTimeToString (time) {
  let hour = 0
  let minutes = 0
  let duration = time / 60

  while (duration >= 60) {
    hour += 1
    duration -= 60
  }

  minutes = duration

  return `${hour}:${minutes}:00`
}