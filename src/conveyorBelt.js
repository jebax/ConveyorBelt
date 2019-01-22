class ConveyorBelt {
  constructor() {
    this.slots = []
  }

  tick() {
    this.slots.push('test')
  }
}

export default ConveyorBelt
