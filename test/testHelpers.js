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
    this.slots = ['A', 'B', 'A']
  }

  tick() {}
}

class TestWorker {
  tick() {}
  takeComponent() { return false }
  placeWidget() { return false }
}

export default { assembleWidget, TestConveyor, TestWorker }
