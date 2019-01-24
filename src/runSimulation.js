import ProductionLine from './productionLine'

const productionLine = new ProductionLine()

for (let i = 0; i < 100; i++) {
  productionLine.tick()
}

console.log(productionLine.output)
