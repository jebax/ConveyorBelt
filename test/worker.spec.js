import { expect } from 'chai'
import sinon from 'sinon'
import helpers from './testHelpers'
import Worker from '../src/worker'

describe('A worker', () => {
  let worker
  let conveyorBelt

  beforeEach(() => {
    worker = new Worker()
    conveyorBelt = {
      releaseItem: sinon.fake(),
      receiveWidget: sinon.fake()
    }
  })

  it('should not initially have any widgets', () => {
    expect(worker.hasWidget).to.be.false
  })

  it('should not initially be assembling a widget', () => {
    expect(worker.isAssembling).to.be.false
  })

  it('has a widget assembly time of 4', () => {
    expect(worker.timeToAssemble).to.equal(4)
  })

  context('taking a component', () => {
    it('can take a component', () => {
      const component = 'A'
      worker.takeComponent(conveyorBelt, 0, component)

      expect(worker.components).to.include(component)
    })

    it('cannot take two of the same component', () => {
      worker.takeComponent(conveyorBelt, 0, 'A')
      worker.takeComponent(conveyorBelt, 0, 'A')

      expect(worker.components.length).to.equal(1)
    })

    it('does not reduce their assembly time on tick unless assembling', () => {
      worker.tick()
      expect(worker.timeToAssemble).to.equal(4)
    })

    it('cannot place a widget if they are not holding one', () => {
      expect(worker.placeWidget()).to.equal(false)
    })

    it('taking a component makes the conveyor belt release widget', () => {
      const slot = 0
      worker.takeComponent(conveyorBelt, slot, 'A')

      expect(conveyorBelt.releaseItem.callCount).to.equal(1)
      expect(conveyorBelt.releaseItem.calledWith(slot)).to.be.true
    })

    it('returns false if there is no component to take', () => {
      expect(worker.takeComponent(conveyorBelt, 0, null)).to.equal(false)
    })
  })


  context('assembling a widget', () => {
    it('begins assembling once both component types are held', () => {
      worker.takeComponent(conveyorBelt, 0, 'A')
      worker.takeComponent(conveyorBelt, 0, 'B')

      expect(worker.isAssembling).to.be.true
    })

    it('takes 4 ticks of time to assemble', () => {
      worker.takeComponent(conveyorBelt, 0, 'A')
      worker.takeComponent(conveyorBelt, 0, 'B')
      const expectedComponents = ['P']

      for (let i = 4; i > 0; i--) {
        worker.tick()
        expect(worker.isAssembling).to.be.true
        expect(worker.hasWidget).to.be.false
      }

      worker.tick()
      expect(worker.isAssembling).to.be.false
      expect(worker.hasWidget).to.be.true
      expect(worker.components).to.deep.equal(expectedComponents)
    })

    it('can take one more component when holding a widget', () => {
      helpers.assembleWidget(worker, conveyorBelt)
      worker.takeComponent(conveyorBelt, 0, 'A')
      worker.takeComponent(conveyorBelt, 0, 'B')
      worker.takeComponent(conveyorBelt, 0, 'A')

      const expectedComponents = ['P', 'A']
      expect(worker.components).to.deep.equal(expectedComponents)
    })

    it('can place a completed widget', () => {
      helpers.assembleWidget(worker, conveyorBelt)
      worker.placeWidget(conveyorBelt)

      expect(worker.components).not.to.includes('P')
      expect(worker.hasWidget).to.be.false
    })

    it('placing widget makes conveyor belt receive widget', () => {
      helpers.assembleWidget(worker, conveyorBelt)

      const slot = 0
      worker.placeWidget(conveyorBelt, slot, 'A')

      expect(conveyorBelt.receiveWidget.callCount).to.equal(1)
      expect(conveyorBelt.receiveWidget.calledWith(slot)).to.be.true
    })
  })
})
