import { expect } from 'chai'
import Worker from '../src/worker'

describe('A worker', () => {
  let worker

  beforeEach(() => {
    worker = new Worker()
  })

  it('should not initially have any widgets', () => {
    expect(worker.hasWidget).to.be.false
  })

  it('should not initially be assembling a widget', () => {
    expect(worker.isAssembling).to.be.false
  })

  it('can take a component', () => {
    const component = 'A'
    worker.takeComponent(component)

    expect(worker.components).to.include(component)
  })

  it('starts assembling once both component types are held', () => {
    const firstComponent = 'A'
    const secondComponent = 'B'
    worker.takeComponent(firstComponent)
    worker.takeComponent(secondComponent)

    expect(worker.isAssembling).to.be.true
  })
})
