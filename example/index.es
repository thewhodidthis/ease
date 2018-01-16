import * as ease from '../index.mjs'

const draw = (buffer, easing) => {
  const { width: w, height: h } = buffer.canvas

  buffer.translate(w * 0.5, h * 0.5)
  buffer.rotate(Math.PI * 0.25)

  const next = (x = h, i = 0) => {
    if (x < 0) {
      return
    }

    const y = easing(x, h) * h * 0.625

    buffer.fillStyle = i % 2 === 0 ? '#888' : '#000'

    buffer.fillRect(-y * 0.5, -y * 0.5, y, y)
    buffer.rotate(y * 0.001)

    next(x - 5, i + 1)
  }

  next()
}

const paths = 'in inOut out'.split(' ')
const types = 'quad quint expo circ'.split(' ')
const total = types.length

const items = document.querySelectorAll('li')

Array.from(items).forEach((item, i) => {
  const plot = item.querySelector('canvas').getContext('2d')

  const type = types[i % total]
  const path = paths[Math.floor(i / total)]

  item.setAttribute('data-ease', `${type}.${path}`)

  draw(plot, ease[type][path])
})
