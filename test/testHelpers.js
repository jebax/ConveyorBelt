import Worker from '../src/worker'

const assembleWidget = (worker, conveyorBelt) => {
  worker.takeComponent(conveyorBelt, 0, 'A')
  worker.takeComponent(conveyorBelt, 0, 'B')
  for (let i = 4; i >= 0; i--) {
    worker.tick()
  }
}

class TestConveyor {
  constructor () {
    this.length = 3
  }

  tick() {}
}

class TestWorker {
  tick() {}
}

export default { assembleWidget, TestConveyor, TestWorker }
