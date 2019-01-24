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

  it('can take a component', () => {
    const component = 'A'
    worker.takeComponent(component)

    expect(worker.components).to.include(component)
  })

  it('cannot take two of the same component', () => {
    worker.takeComponent('A')
    worker.takeComponent('A')

    expect(worker.components.length).to.equal(1)
  })

  it('does not reduce their assembly time on tick unless assembling', () => {
    worker.tick()
    expect(worker.timeToAssemble).to.equal(4)
  })

  it('cannot place a widget if they are not holding one', () => {
    expect(worker.placeWidget()).to.equal(false)
  })

  context('assembling a widget', () => {
    it('begins assembling once both component types are held', () => {
      worker.takeComponent('A')
      worker.takeComponent('B')

      expect(worker.isAssembling).to.be.true
    })

    it('takes 4 ticks of time to assemble', () => {
      worker.takeComponent('A')
      worker.takeComponent('B')
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
      helpers.assembleWidget(worker)
      worker.takeComponent('A')
      worker.takeComponent('B')
      worker.takeComponent('A')

      const expectedComponents = ['P', 'A']
      expect(worker.components).to.deep.equal(expectedComponents)
    })

    it('can place a completed widget', () => {
      helpers.assembleWidget(worker)
      worker.placeWidget(conveyorBelt)

      expect(worker.components).not.to.includes('P')
      expect(worker.hasWidget).to.be.false
    })

    it('placing widget makes conveyor belt receive widget', () => {
      helpers.assembleWidget(worker)

      const slot = 0
      worker.placeWidget(conveyorBelt, slot)

      expect(conveyorBelt.receiveWidget.callCount).to.equal(1)
      expect(conveyorBelt.receiveWidget.calledWith(slot)).to.be.true
    })
  })
})
