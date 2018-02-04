module.exports = {
  volumeOfRectangularPrism(length, width, height) {
    if (arguments.length !== 3) throw 'invalid number of arguments'
    if (typeof length !== 'number' || length <= 0) throw 'invalid length'
    if (typeof width  !== 'number' || width <= 0) throw 'invalid width'
    if (typeof height !== 'number' || height <= 0) throw 'invalid height'

    return length * width * height
  },

  surfaceAreaOfRectangularPrism(length, width, height) {
    if (arguments.length !== 3) throw 'invalid number of arguments'
    if (typeof length !== 'number' || length <= 0) throw 'invalid length'
    if (typeof width  !== 'number' || width <= 0) throw 'invalid width'
    if (typeof height !== 'number' || height <= 0) throw 'invalid height'

    return length*width*2 + width*height*2 + length*height*2
  },

  volumeOfSphere(radius) {
    if (arguments.length !== 1) throw 'invalid number of arguments'
    if (typeof radius !== 'number' || radius <= 0) throw 'invalid radius'

    return 4/3 * Math.PI * radius * radius * radius
  },

  surfaceAreaOfSphere(radius) {
    if (arguments.length !== 1) throw 'invalid number of arguments'
    if (typeof radius !== 'number' || radius <= 0) throw 'invalid radius'

    return 4 * Math.PI * radius * radius
  }
}
