import * as ease from '../index.mjs'
import data from './data.js'

const TAU = Math.PI * 2
const plot = (buffer, easing) => {
  const w = buffer.canvas.width
  const h = buffer.canvas.height
  const g = 10
  const d = 3

  for (let x = g, n = w - g; x < n; x += d) {
    const y = easing(x, n) * (h - (2 * g))

    buffer.save()
    buffer.translate(0, h - g)
    buffer.scale(1, -1)

    buffer.beginPath()
    buffer.arc(x, y, 1, 0, TAU)
    buffer.fill()

    buffer.restore()
  }
}

const ofInterest = ['quad', 'quint', 'expo', 'circ']

const paths = 'in,out,inOut'.split(',')
const types = Object.keys(data).filter(v => ofInterest.indexOf(v) !== -1)

const list = document.querySelector('ul')
const adam = list.removeChild(list.querySelector('li'))

const totalPaths = paths.length
const totalTypes = types.length
const totalGrand = totalTypes * totalPaths

for (let i = 0; i < totalGrand; i += 1) {
  const type = types[i % totalTypes]
  const path = paths[Math.floor(i / totalTypes)]

  const papa = adam.cloneNode(true)
  const turf = papa.querySelector('canvas').getContext('2d')

  const points = data[type][path].join(', ')
  const easing = ease[type][path]

  papa.setAttribute('data-ease', `${type}.${path}`)
  papa.setAttribute('style', `transition-timing-function: cubic-bezier(${points});`)

  list.appendChild(papa)

  plot(turf, easing)
}
