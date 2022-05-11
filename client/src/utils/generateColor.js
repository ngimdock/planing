const COLORS = (require("./colors.json")).colors

export default function generateColor () {
  const length = COLORS.length

  const randomIndex = Math.floor(Math.random() * length)

  return COLORS[randomIndex]
}