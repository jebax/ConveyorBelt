import Worker from '../src/worker'

const helpers = {
  assembleWidget (worker) {
    worker.takeComponent('A')
    worker.takeComponent('B')
    for (let i = 4; i >= 0; i--) {
      worker.tick()
    }
  }
}

export default helpers
