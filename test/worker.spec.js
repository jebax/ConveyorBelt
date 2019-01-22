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

  describe('assembling a widget', () => {
    let secondWorker

    before(() => {
      secondWorker = new Worker()
    })

    it('begins assembling once both component types are held', () => {
      secondWorker.takeComponent('A')
      secondWorker.takeComponent('B')

      expect(secondWorker.isAssembling).to.be.true
    })

    it('takes 4 ticks of time to assemble', () => {
      const expectedComponents = ['P']

      for (let i = 4; i > 0; i--) {
        secondWorker.tick()
        expect(secondWorker.isAssembling).to.be.true
        expect(secondWorker.hasWidget).to.be.false
      }

      secondWorker.tick()
      expect(secondWorker.isAssembling).to.be.false
      expect(secondWorker.hasWidget).to.be.true
      expect(secondWorker.components).to.deep.equal(expectedComponents)
    })

    it('can take one more component when holding a widget', () => {
      const expectedComponents = ['P', 'A']

      secondWorker.takeComponent('A')
      secondWorker.takeComponent('B')
      secondWorker.takeComponent('A')

      expect(secondWorker.components).to.deep.equal(expectedComponents)
    })
  })
})
