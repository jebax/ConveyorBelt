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
})
