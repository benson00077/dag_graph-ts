// mountPath(divs, arrowRef, [opt])  opt is for dynamic draw connector

export class SvgPath {
  private ele: SVGPathElement;
  command : string | null

  constructor(ele: SVGPathElement) {
    this.ele = ele;
    this.command = this.ele.getAttribute("d")
  }

  mount(pathPara: string) {
    this.ele.setAttribute("d", pathPara);
  }
}

export class SvgPathEnds {
  private from: HTMLDivElement;
  private to: HTMLDivElement;

  constructor(divs: { from: HTMLDivElement; to: HTMLDivElement }) {
    this.from = divs.from;
    this.to = divs.to;
  }
  
  private getPosnLeftEnds() {
    let endFrom = {
      x: this.from.offsetLeft - 8,
      y: this.from.offsetTop + this.from.offsetHeight / 2 + 10,
    };
    let endTo = {
      x: this.to.offsetLeft - 8,
      y: this.to.offsetTop + this.to.offsetHeight / 2 - 10,
    };
    endFrom.x += getTrans(this.from).number.x
    endFrom.y += getTrans(this.from).number.y
    endTo.x += getTrans(this.to).number.x
    endTo.y += getTrans(this.to).number.y

    return [endFrom, endTo];
  }

  getCurveCommand() {
    const [endFrom, endTo] = this.getPosnLeftEnds();
    const delta = 100
    let curvePara = {
      moveFrom: endFrom,
      controlPoint1: { x: endFrom.x - delta, y: endFrom.y },
      controlPoint2: { x: endTo.x - delta, y: endTo.y },
      moveTo: endTo,
    };
    let dStr = getCurvePathCommand(curvePara);
    return dStr
  }
}

export function getNewCurvesPathCommnadAfterDrag(prevCommand: string, indicator: "FROM" | "TO", translate: {x: number, y: number}) {
  // prevCommand = "M142,180 C42,180 192,310 292,310"
  let prevPara = prevCommand.split(/[\s|,]/g) // ['M142', '180', 'C42', '180', '192', '310', '292', '310']
  prevPara[0] = prevPara[0].replace("M", "") 
  prevPara[2] = prevPara[2].replace("C", "") // prevPara = ['142', '180', '42', '180', '192', '310', '292', '310']
  
  const curvePara = {
    moveFrom: {x: +prevPara[0], y: +prevPara[1]},
    controlPoint1: {x: +prevPara[2], y: +prevPara[3]},
    controlPoint2: {x: +prevPara[4], y: +prevPara[5]},
    moveTo: {x: +prevPara[6], y: +prevPara[7]},
  }
  
  if (indicator === "FROM") {
    curvePara.moveFrom.x += translate.x
    curvePara.moveFrom.y += translate.y
    curvePara.controlPoint1.x += translate.x
    curvePara.controlPoint1.y += translate.y
  } else if (indicator === "TO") {
    curvePara.controlPoint2.x += translate.x
    curvePara.controlPoint2.y += translate.y
    curvePara.moveTo.x += translate.x
    curvePara.moveTo.y += translate.y
  } else throw new Error("Wrong indicaotr format")
  const newCurvePara = getCurvePathCommand(curvePara)
  return newCurvePara
}

function getCurvePathCommand(CurvesPara: {
  moveFrom: { x: number; y: number };
  controlPoint1: { x: number; y: number };
  controlPoint2: { x: number; y: number };
  moveTo: { x: number; y: number };
}) {
  const { moveFrom, controlPoint1, controlPoint2, moveTo } = CurvesPara;
  const dStr =
    `M${moveFrom.x},${moveFrom.y} ` +
    `C${controlPoint1.x},${controlPoint1.y} ` +
    `${controlPoint2.x},${controlPoint2.y} ` +
    `${moveTo.x},${moveTo.y}`;
  return dStr;
}

function getTrans(transform: HTMLDivElement) {
  let trans = transform.style.transform // transform: 'translate(0%, 0%) translate(150px, 150px)'
  const arr = trans.split(" ") 
  const transArr = arr.map((each) => {
    return +each.replace(/[^\d]/g, "") // ['0', '0', '150', '150'] into number[]
  }) 
  const result = {
    percentage: {x: transArr[0], y: transArr[1]},
    number: {x: transArr[2], y: transArr[3]}
  }
  return result 
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
