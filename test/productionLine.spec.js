import { expect } from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire-2'
import helpers from './testHelpers'

proxyquire.noCallThru()

describe('A production line', () => {
  let lineExports
  let productionLine
  let conveyorClass
  let workerClass
  let takeComponentStub
  let placeWidgetStub

  beforeEach(() => {
    conveyorClass = helpers.TestConveyor
    workerClass = helpers.TestWorker
    lineExports = proxyquire('../src/productionLine', {
      './conveyorBelt': conveyorClass,
      './worker': workerClass
    })

    productionLine = new lineExports.default

    takeComponentStub = sinon.stub(workerClass.prototype, 'takeComponent')
    placeWidgetStub = sinon.stub(workerClass.prototype, 'placeWidget')
  })

  it('starts with the correct conveyor belt', () => {
    expect(productionLine.conveyorBelt).to.deep.equal(new conveyorClass())
  })

  it('starts with 3 pairs of workers by default', () => {
    const worker = new workerClass()
    const expectedWorkers = [
      [worker, worker],
      [worker, worker],
      [worker, worker]
    ]

    expect(productionLine.workers).to.deep.equal(expectedWorkers)
  })

  it('can compute the total number of widgets and unused components', () => {
    productionLine.conveyorBelt.finishedItems = ['A', 'B', 'A', 'P', 'P']
    const expectedResult = {
      unusedComponents: 3,
      completedWidgets: 2
    }

    expect(productionLine.output).to.deep.equal(expectedResult)
  })

  it('ticks time along with its conveyor belt and workers', () => {
    const workerTick = sinon.stub(workerClass.prototype, 'tick')
    const conveyorTick = sinon.stub(conveyorClass.prototype, 'tick')

    productionLine.tick()

    expect(workerTick.callCount).to.equal(6)
    expect(conveyorTick.callCount).to.equal(1)
  })

  it('instructs the workers to perform the correct actions', () => {
    takeComponentStub.returns(false)
    placeWidgetStub.returns(false)
    productionLine.tick()

    expect(takeComponentStub.callCount).to.equal(6)
    expect(placeWidgetStub.callCount).to.equal(6)
  })

  it('only lets the second worker act when the first has not acted', () => {
    takeComponentStub.returns(true)
    placeWidgetStub.returns(true)
    productionLine.tick()
    expect(takeComponentStub.callCount).to.equal(3)
  })

  afterEach(() => {
    takeComponentStub.restore()
    placeWidgetStub.restore()
  })
})
