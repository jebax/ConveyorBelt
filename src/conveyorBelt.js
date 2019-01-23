class ConveyorBelt {
  constructor() {
    this.slots = []
    this.componentTypes = ['A', 'B', null]
  }

  tick() {
    const randomIndex = Math.floor(Math.random() * Math.floor(3))

    this.slots.push(this.componentTypes[randomIndex])
  }
}

export default ConveyorBelt
