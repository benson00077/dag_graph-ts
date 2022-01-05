
import React, { useRef, useContext, useState } from "react";
import { IdagData } from "../dag/types"
import { RefsArrows, RefsDiv } from "../ts/types/app_types";
import { PositionContext } from "./contexts/PositionContext"
import arrowRenderer from "./ArrowRenderer";
import vertexRenderer  from './VertexRenderer'
import arrowsInfoGetter from "./utils/arrowsInfoGetter";
import SelectArrowStyle from "./SelectArrowStyle/SelectArrowStyle";
import { arrowStyle } from '../ts/types/app_types'
type DrawGraphProps = {
  dag: IdagData,
  topSorted: string[]
}


export default function DrawGraph({ dag, topSorted }: DrawGraphProps) {
  
  const [positionMap, setPositionMap] = useContext(PositionContext)
  let [arrowsMap, arrowsNumber] = arrowsInfoGetter(dag)

  const refsDivs = useRef<RefsDiv>([]);
  const refsArrows = useRef<RefsArrows>([]);
  refsDivs.current = [...new Array(topSorted.length)].map(() => React.createRef());
  refsArrows.current = [...new Array(arrowsNumber)].map(() => React.createRef());

  const [arrowStyleOpt, setArrowStyleOpt] = useState<arrowStyle>('CURVE')
  /** test block */
  // useEffect(() => {
  //   setPositionMap({
  //     "test": {
  //       posnOrigin: [2, 5],
  //       posnNew: [4, 5],
  //       translate: { x: 4, y: 3 }
  //     }
  //   })
  // }, [])

  return (
    <>
      <p className="instructions">
        Drag items
        <br/>
        Double click items to change title / name
      </p>
      <div className="graph-wrapper" >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="3"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          {arrowRenderer({dag, refs: [refsDivs, refsArrows], arrowStyleOpt})}
        </svg>
          {vertexRenderer({
            dag,
            refs: [refsDivs, refsArrows],
            arrowStyleOpt
          })}
      </div>
      <SelectArrowStyle styleOpt={arrowStyleOpt} setStyleOpt={setArrowStyleOpt} />
    </>
  )
}