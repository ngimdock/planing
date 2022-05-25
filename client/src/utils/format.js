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

export function getDayIdFromString (day) {
  switch (day.toLowerCase()) {
    case "lundi": return 1
    case "mardi": return 2
    case "mercredi": return 3
    case "jeudi": return 4
    case "vendredi": return 5
    case "samedi": return 6
    case "dimanche": return 7
    default: break
  }
}