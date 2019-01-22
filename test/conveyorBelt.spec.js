import { expect } from 'chai'
import ConveyorBelt from '../src/conveyorBelt'

describe('A conveyor belt', () => {
  let conveyorBelt

  beforeEach(() => {
    conveyorBelt = new ConveyorBelt()
  })

  it('starts with empty slots', () => {
    expect(conveyorBelt.slots.length).to.equal(0)
  })

  it('gets a new component with each tick of time', () => {
    conveyorBelt.tick()
    expect(conveyorBelt.slots.length).to.equal(1)
  })
})
