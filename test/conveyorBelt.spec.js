import { expect } from 'chai'
import sinon from 'sinon'
import ConveyorBelt from '../src/conveyorBelt'

describe('A conveyor belt', () => {
  let conveyorBelt
  let randomStub

  beforeEach(() => {
    conveyorBelt = new ConveyorBelt()
    randomStub = sinon.stub(Math, 'floor')
  })

  it('starts with empty slots', () => {
    expect(conveyorBelt.slots.length).to.equal(0)
  })

  it('gets a new component with each tick of time', () => {
    conveyorBelt.tick()
    expect(conveyorBelt.slots.length).to.equal(1)
  })

  it('can randomly get an `A` component', () => {
    randomStub.returns(0)
    conveyorBelt.tick()

    expect(conveyorBelt.slots[0]).to.equal('A')
  })

  it('can randomly get a `B` component', () => {
    randomStub.returns(1)
    conveyorBelt.tick()

    expect(conveyorBelt.slots[0]).to.equal('B')
  })

  it('can randomly get an empty slot', () => {
    randomStub.returns(2)
    conveyorBelt.tick()

    expect(conveyorBelt.slots[0]).to.equal(null)
  })

  it('cannot receive a widget in a slot containing a component', () => {
    randomStub.returns(0)
    conveyorBelt.tick()

    conveyorBelt.receiveWidget(0)
    expect(conveyorBelt.slots).not.to.includes('P')
  })

  it('can receive a widget in an empty slot', () => {
    randomStub.returns(2)
    conveyorBelt.tick()

    conveyorBelt.receiveWidget(0)
    expect(conveyorBelt.slots[0]).to.equal('P')
  })

  afterEach(() => {
    randomStub.restore()
  })
})
