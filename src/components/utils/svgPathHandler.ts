// mountPath(divs, arrowRef, [opt])  opt is for dynamic draw connector

export class SvgPath {
  private ele: SVGPathElement;

  constructor(ele: SVGPathElement) {
    this.ele = ele;
  }

  getCurrentCommand() {
    let command = this.ele.getAttribute("d"); // null or "M142,180 C42,180 192,310 292,310"
    if (command) {
      return command;
    } else {
      return false;
    }
  }

  mount(pathPara: string) {
    this.ele.setAttribute("d", pathPara);
  }
}

export class SvgPathEnd {
  private from: HTMLDivElement;
  private to: HTMLDivElement;

  constructor(divs: { from: HTMLDivElement; to: HTMLDivElement }) {
    this.from = divs.from;
    this.to = divs.to;
  }

  private getPosnLeftEnd() {
    let endFrom = {
      x: this.from.offsetLeft - 8,
      y: this.from.offsetTop + this.from.offsetHeight / 2 + 10,
    };
    let endTo = {
      x: this.to.offsetLeft - 8,
      y: this.to.offsetTop + this.to.offsetHeight / 2 - 10,
    };
    return [endFrom, endTo];
  }

  getCurvesCommand() {
    const [endFrom, endTo] = this.getPosnLeftEnd();
    const delta = 100
    let curvesCommand = {
      moveFrom: endFrom,
      controlPoint1: { x: endFrom.x - delta, y: endFrom.y },
      controlPoint2: { x: endTo.x - delta, y: endTo.y },
      moveTo: endTo,
    };
    let dStr = getCurvesPathCommand(curvesCommand);
    return dStr
  }
}

function getCurvesPathCommand(CurvesCommand: {
  moveFrom: { x: number; y: number };
  controlPoint1: { x: number; y: number };
  controlPoint2: { x: number; y: number };
  moveTo: { x: number; y: number };
}) {
  const { moveFrom, controlPoint1, controlPoint2, moveTo } = CurvesCommand;
  const dStr =
    `M${moveFrom.x},${moveFrom.y} ` +
    `C${controlPoint1.x},${controlPoint1.y} ` +
    `${controlPoint2.x},${controlPoint2.y} ` +
    `${moveTo.x},${moveTo.y}`;
  return dStr;
}



// let drawConnector = function(divFrom, divTo, arrowLeft) {
//   let fromPosnLeft = {
//     x: divFrom.offsetLeft - 8,
//     y: divFrom.offsetTop  + divFrom.offsetHeight / 2 + 10
//   };
//   let toPosnLeft = {
//     x: divTo.offsetLeft - 8,
//     y: divTo.offsetTop  + divTo.offsetHeight / 2 - 10
//   };
//   let dStrLeft =
//       "M" +
//       (fromPosnLeft.x      ) + "," + (fromPosnLeft.y) + " " +
//       "C" +
//       (fromPosnLeft.x - 100) + "," + (fromPosnLeft.y) + " " +
//       (toPosnLeft.x - 100) + "," + (toPosnLeft.y) + " " +
//       (toPosnLeft.x      ) + "," + (toPosnLeft.y);
//   arrowLeft.setAttribute("d", dStrLeft);
// };
