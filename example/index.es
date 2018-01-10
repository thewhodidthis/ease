import * as ease from '../index.mjs'

const draw = (plot, easing) => {
  const { width: w, height: h } = plot.canvas

  plot.strokeStyle = 'white'

  const next = (x) => {
    if (x > w) {
      return
    }

    const y = easing(x, w) * (h - 12)

    plot.save()
    plot.translate(0, h)
    plot.scale(1, -1)

    plot.moveTo(x + 0.5, y - h)
    plot.lineTo(x + 0.5, y)
    plot.restore()
    plot.stroke()

    next(x + 4)
  }

  next(3)
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
