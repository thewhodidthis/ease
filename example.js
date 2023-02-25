import * as ease from "./main.js"

const draw = (target, source) => {
  const { width: w, height: h } = target.canvas

  target.translate(w * 0.5, h * 0.5)
  target.rotate(Math.PI * 0.25)

  const next = (x = h, i = 0) => {
    if (x < 0) {
      return
    }

    const y = source(x, h) * h * 0.625

    target.fillStyle = i % 2 === 0 ? "#888" : "#000"

    target.fillRect(-y * 0.5, -y * 0.5, y, y)
    target.rotate(y * 0.001)

    next(x - 5, i + 1)
  }

  next()
}

const paths = "in inOut out".split(" ")
const types = "quad quint expo circ".split(" ")
const total = types.length

const items = document.querySelectorAll("span")

Array.from(items).forEach((item, i) => {
  const plot = item.querySelector("canvas").getContext("2d")

  const type = types[i % total]
  const path = paths[Math.floor(i / total)]

  item.setAttribute("data-ease", `${type}.${path}`)

  draw(plot, ease[type][path])
})
