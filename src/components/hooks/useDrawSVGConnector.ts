//TODO 
// drawConnectorInitial = (divFrom, divTo, arrowRef, translate)
// drawConnectorDynamic = (arrowsRefArr, vertexName, draggingDiv, translate)  vertexName to know is From arrow / To arrow.

import { SvgPath, SvgPathEnd } from "../utils/svgPathHandler"

export default function useDrawConnector() {
  function drawConnectorInitial(
    divs: {from: HTMLDivElement, to: HTMLDivElement},
    arrowRef: SVGPathElement,
    translateMap: {divFrom: {x:number, y:number}, divTo: {x:number, y:number}}
  ) {
    //TODO
    const path = new SvgPath(arrowRef)
    const ends = new SvgPathEnd(divs)
    const pathCommand = ends.getCurvesCommand()
    path.mount(pathCommand)
  }

  function drawConnectorDynamic(
    arrowsRef: React.RefObject<SVGPathElement>[],
    vertexName: string,
    draggingDiv: HTMLDivElement,
    translate: {x: number, y:number}
  ) {
    //TODO
  }

  return ({ drawConnectorInitial, drawConnectorDynamic})
}

//TODO
export class SvgPathPoint {
  private from: HTMLDivElement
  private to: HTMLDivElement

  constructor(divs: {divFrom: HTMLDivElement, divTo: HTMLDivElement}) {
    this.from = divs.divFrom
    this.to = divs.divTo
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