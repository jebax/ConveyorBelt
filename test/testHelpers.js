import Worker from '../src/worker'

const assembleWidget = worker => {
  worker.takeComponent('A')
  worker.takeComponent('B')
  for (let i = 4; i >= 0; i--) {
    worker.tick()
  }
}

class TestConveyor {
  constructor() {
    this.length = 3
  }
}

class TestWorker {}

export default { assembleWidget, TestConveyor, TestWorker }
