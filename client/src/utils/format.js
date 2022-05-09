/**
 * Format name
 * @param {string} name 
 * @returns 
 */
export function formatName (name) {
  const names = name.split(" ")

  return (names.map(subname => subname[0].toUpperCase() + subname.substring(1).toLowerCase())).join(" ")
}