import { RefsArrows } from "../../ts/types/app_types"
import { SvgPath, SvgPathEnds, getNewCurvesPathCommnadAfterDrag } from "../utils/svgPathHandler"

export function useDrawConnectorInitial() {
  function drawConnectorInitial(
    divs: {from: HTMLDivElement, to: HTMLDivElement},
    arrowRef: SVGPathElement,
    translateMap = {
      divFrom: { x: 0, y: 0 },
      divTo: { x: 0, y: 0 },
    } // TODO: btn switch btw defualt position <-> dragged positin
  ) {
    const path = new SvgPath(arrowRef)
    const ends = new SvgPathEnds(divs)
    const pathCommand = ends.getCurveCommand()
    path.mount(pathCommand)
  }

  return ({ drawConnectorInitial })
}



export function useDrawConnectorDynamic() {

  let defaultPathMomoizer: {[pathId: string]: string} = {}

  function drawConnectorDynamic(
    arrowsRef: RefsArrows,
    vertexName: string,
    translate: {x: number, y:number}
  ) {
    //TODO   
    arrowsRef.forEach((arrowRef, i) => {
      const pathRef = arrowRef.current
      let indicator: "FROM" | "TO"
      if (pathRef?.getAttribute("data-vertex_from") === vertexName ) {
        indicator = "FROM" 
      } else if (pathRef?.getAttribute("data-vertex_to") === vertexName ) {
        indicator = "TO"
      } else throw new Error("SVGPathElemet missing attrivute data-vertex_from and data-vertex_to")

      const path = new SvgPath(pathRef)
      
      if (!path.command) throw new Error ("path.command not found")
      if (!defaultPathMomoizer[pathRef.id]) {
        defaultPathMomoizer[pathRef.id] = path.command
      }
      if (defaultPathMomoizer[pathRef.id]) {
        const newPathCommand = getNewCurvesPathCommnadAfterDrag(defaultPathMomoizer[pathRef.id], indicator, translate)
        path.mount(newPathCommand)
      }
    })
  }

  return ({ drawConnectorDynamic })
}