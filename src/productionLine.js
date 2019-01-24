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
}

export default ProductionLine
