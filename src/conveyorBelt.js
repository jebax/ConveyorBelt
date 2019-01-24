class ConveyorBelt {
  constructor (length) {
    this.componentTypes = ['A', 'B', null]
    this.slots = []
    this.length = length || 3
    this.finishedItems = []
  }

  releaseItem (slot) {
    this.slots[slot] = null
  }

  receiveWidget (slot) {
    if (!this.slots[slot]) {
      this.slots[slot] = 'P'
    }
  }

  tick () {
    const randomIndex = Math.floor(Math.random() * Math.floor(3))
    this.slots.unshift(this.componentTypes[randomIndex])

    if (this.slots.length > this.length) {
      this.finishedItems.push(this.slots.pop())
    }
  }
}

export default ConveyorBelt
