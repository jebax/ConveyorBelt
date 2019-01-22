class Worker {
  constructor() {
    this.components = []
    this.hasWidget = false
    this.isAssembling = false
  }

  takeComponent(component) {
    this.components.push(component)

    if (this.components.includes('A') && this.components.includes('B')) {
      this.isAssembling = true
    }
  }
}

export default Worker
