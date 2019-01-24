import * as conveyorExports from './conveyorBelt'
import * as workerExports from './worker'

class ProductionLine {
  constructor () {
    this.conveyorBelt = new conveyorExports.default()
    this.workers = []
    this.assignWorkers()
  }

  get output () {
    return {
      unusedComponents: this.conveyorBelt.finishedItems.filter(
        item => item === 'A' || item === 'B'
      ).length,
      completedWidgets: this.conveyorBelt.finishedItems.filter(
        item => item === 'P'
      ).length
    }
  }

  assignWorkers () {
    const numberOfPairs = this.conveyorBelt.length

    for (let pair = 1; pair <= numberOfPairs; pair++) {
      const firstWorker = new workerExports.default()
      const secondWorker = new workerExports.default()

      this.workers.push([firstWorker, secondWorker])
    }
  }

  tick () {
    this.conveyorBelt.tick()
    this.workers.forEach(pair => pair.forEach(worker => worker.tick()))

    this.conveyorBelt.slots.forEach((component, slotNumber) => {
      const firstWorker = this.workers[slotNumber][0]
      const secondWorker = this.workers[slotNumber][1]

      if (
        firstWorker.takeComponent(this.conveyorBelt, slotNumber, component) === false &&
        firstWorker.placeWidget(this.conveyorBelt, slotNumber) === false
      ) {
        secondWorker.takeComponent(this.conveyorBelt, slotNumber, component)
        secondWorker.placeWidget(this.conveyorBelt, slotNumber)
      }
    })
  }
}

export default ProductionLine
