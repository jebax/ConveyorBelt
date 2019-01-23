import { expect } from 'chai'
import sinon from 'sinon'
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

  it('can randomly get an `A` component', () => {
    sinon.stub(Math, 'floor').returns(0)
    conveyorBelt.tick()

    Math.floor.restore()
    expect(conveyorBelt.slots[0]).to.equal('A')
  })

  it('can randomly get a `B` component', () => {
    sinon.stub(Math, 'floor').returns(1)
    conveyorBelt.tick()

    Math.floor.restore()
    expect(conveyorBelt.slots[0]).to.equal('B')
  })

  it('can randomly get an empty slot', () => {
    sinon.stub(Math, 'floor').returns(2)
    conveyorBelt.tick()

    Math.floor.restore()
    expect(conveyorBelt.slots[0]).to.equal(null)
  })
})
