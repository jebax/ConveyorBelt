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

  beforeEach(() => {
    conveyorClass = helpers.TestConveyor
    workerClass = helpers.TestWorker
    lineExports = proxyquire('../src/productionLine', {
      './conveyorBelt': conveyorClass,
      './worker': workerClass
    })

    productionLine = new lineExports.default
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
    productionLine.unusedComponents = ['A', 'B', 'A']
    productionLine.completedWidgets = ['P', 'P']
    const expectedResult = {
      unusedComponents: 3,
      completedWidgets: 2
    }

    expect(productionLine.output).to.deep.equal(expectedResult)
  })
})
