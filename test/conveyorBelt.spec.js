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

  it('has a default length of 3', () => {
    expect(conveyorBelt.length).to.equal(3)
  })

  it('has an adjustable length', () => {
    const longConveyorBelt = new ConveyorBelt(100)

    expect(longConveyorBelt.length).to.equal(100)
  })

  context('getting components', () => {
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
  })

  context('receiving widgets', () => {
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
  })

  context('releasing items', () => {
    it('should remove the correct item', () => {
      randomStub.returns(0)
      conveyorBelt.tick()
      randomStub.returns(1)
      conveyorBelt.tick()

      conveyorBelt.releaseItem(0)
      expect(conveyorBelt.slots).to.deep.equal([null, 'A'])
    })
  })

  context('item reaching the end of the belt', () => {
    it('reaches the end after 4 ticks by default', () => {
      randomStub.returns(0)

      for(let i = 0; i < 3; i++) {
        conveyorBelt.tick()
        expect(conveyorBelt.finishedItems.length).to.equal(0)
      }

      conveyorBelt.tick()
      expect(conveyorBelt.finishedItems).to.deep.equal(['A'])
    })

    it('can be an assembled widget', () => {
      randomStub.returns(2)

      for(let i = 0; i < 3; i++) conveyorBelt.tick()
      conveyorBelt.receiveWidget(2)
      conveyorBelt.tick()

      expect(conveyorBelt.finishedItems).to.deep.equal(['P'])
    })
  })

  afterEach(() => {
    randomStub.restore()
  })
})
