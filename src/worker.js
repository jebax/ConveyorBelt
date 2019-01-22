class Worker {
  constructor() {
    this.components = []
    this.timeToAssemble = 4
    this.isAssembling = false
    this.hasWidget = false
  }

  takeComponent(component) {
    if (!this.components.includes(component) && this.components.length < 2) {
      this.components.push(component)
    }
    if (this.components.includes('A') && this.components.includes('B')) {
      this.isAssembling = true
    }
  }

  tick() {
    if (this.isAssembling && this.timeToAssemble === 0) {
      this.hasWidget = true
      this.isAssembling = false
      this.components = ['P']
    } else if (this.isAssembling) {
      this.timeToAssemble -= 1
    }
  }
}

export default Worker
