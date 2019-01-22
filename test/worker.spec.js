import { expect } from 'chai'
import Worker from '../src/worker'

describe('A worker', () => {
  let worker

  before(() => {
    worker = new Worker()
  })

  it('should not initially have any widgets', () => {
    expect(worker.hasWidget).to.be.false
  })

  it('should not initially be assembling a widget', () => {
    expect(worker.isAssembling).to.be.false
  })
})
