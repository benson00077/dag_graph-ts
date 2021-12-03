//TODO
export class SvgPathPoint {
  private from: HTMLDivElement
  private to: HTMLDivElement

  constructor(divs: any) {
    const {divFrom, divTo} = divs
    this.from = divFrom
    this.to = divTo
  }
  
  fromLeftCurved() {
    const pathPoints = {
      from: {
        x: this.from.offsetLeft - 8,
        y: this.from.offsetTop + this.from.offsetHeight / 2 + 10
      },
      to: {
        x: this.to.offsetLeft - 8,
        y: this.to.offsetTop  + this.to.offsetHeight / 2 - 10
      }
    }
    return pathPoints
  }

  fromButtonTop() {
    //TODO
  }
}