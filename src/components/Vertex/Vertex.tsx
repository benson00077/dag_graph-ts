import { useEffect, useState } from "react";
import * as S from "./styles";
import Draggable from "../Draggble/Draggable";
import { DraggableData } from "../Draggble/types";
import { arrowStyle, RefsArrows } from "../../ts/types/app_types"
import { useDrawConnectorDynamic } from "../hooks/useDrawSVGConnector"
import Rename from "./Rename";

export default function Vertex(props: {
  name: string;
  arrowStyleOpt: arrowStyle;
  location: [number, number];
  forwardedRef: React.RefObject<HTMLDivElement>;
  forwardedArrowsRefs: RefsArrows;
}) {
  const { name, arrowStyleOpt, location, forwardedRef, forwardedArrowsRefs } = props;
  const [row, column] = location;
  const [topPosition, leftPosition] = [150 + 150 * row, 150 * column];
  const [topStyle, leftStyle] = [topPosition + "px", leftPosition + "px"];
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: { x: 0, y: 0 },
    controlledPosition: { x: -400, y: 200 } //TODO
  })
  const { drawConnectorDynamic } = useDrawConnectorDynamic(arrowStyleOpt)
  const relatedArrows = relatedArrowsDetector(forwardedArrowsRefs, name);

  const handleDrag = (e: MouseEvent, ui: DraggableData) => {
    const { x, y } = state.deltaPosition
    setState(prev => ({
      ...prev,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    }))
    drawConnectorDynamic(relatedArrows, name, { x: ui.deltaX, y: ui.deltaY })
  }
  const onStart = () => setState(prev => ({ ...prev, activeDrags: state.activeDrags + 1 }));
  const onStop = () => setState(prev => ({ ...prev, activeDrags: state.activeDrags - 1 }));

  const dragHandlers = { onStart: onStart, onStop: onStop };

  let posn = {
    position: `absolute`,
    // top: `${topStyle}`,
    // left: `${leftStyle}`,
  };

  useEffect(() => {
    //console.log(forwardedRef);
  });

  return (
    <>
      <Draggable
        {...dragHandlers}
        onDrag={handleDrag}
        forwardedRef={forwardedRef}
        positionOffset={{ x: '0%', y: '0%' }}
        defaultPosition={{ x: leftPosition, y: topPosition }}
        defaultClassName={`draggable-${name}`}
      >
        <S.Container posn={posn} ref={forwardedRef} id={name}>
          <Rename initName={name} >
            <>
              <span> {name} </span>
              <br />
              {`x: ${state.deltaPosition.x.toFixed(0)}, y: ${state.deltaPosition.y.toFixed(0)}`}
            </>
          </Rename>
        </S.Container>
      </Draggable>
    </>
  );
}


// 不能 Hoist 到 vertex 以上的層級，因為要等 arrow 畫出來才有辦法存取到  arrows refs
function relatedArrowsDetector(forwardedArrowsRefs: RefsArrows, vertexName: string) {
  let relatedArrows: RefsArrows = forwardedArrowsRefs.filter((arrow) => {
    if (!arrow.current) return // initial render, ref would not access dom
    const pathEle = arrow.current;
    return (
      pathEle && (pathEle.getAttribute("data-vertex_from") === vertexName ||
        pathEle.getAttribute("data-vertex_to") === vertexName)
    );
  });
  return relatedArrows;
};