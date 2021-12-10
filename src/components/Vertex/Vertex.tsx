import { useEffect, useState } from "react";
import * as S from "./styles";
import Draggable from "../Draggble/Draggable";
import { DraggableData } from "../Draggble/types";

export default function Vertex(props: {
  name: string;
  location: [number, number];
  forwardedRef: React.MutableRefObject<HTMLDivElement>;
  forwardedArrowsRefs: React.RefObject<SVGPathElement>[];
}) {
  const { name, location, forwardedRef, forwardedArrowsRefs } = props;
  const [row, column] = location;
  const [topPosition, leftPosition] = [150 + 150 * row, 150 * column];
  const [topStyle, leftStyle] = [topPosition + "px", leftPosition + "px"];

  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {x: 0, y:0},
    controlledPosition: {x: -400, y: 200}
  })
  const handleDrag = (e: MouseEvent, ui: DraggableData) => {
    const {x, y} = state.deltaPosition
    setState(prev => ({
      ...prev, 
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    }))
  }
  const onStart = () => setState(prev => ({...prev, activeDrags: state.activeDrags++}));
  const onStop = () => setState(prev => ({...prev, activeDrags: state.activeDrags--}));

  const dragHandlers = {onStart: onStart, onStop: onStop};

  let posn = {
    position: `absolute`,
    top: `${topStyle}`,
    left: `${leftStyle}`,
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
        //position={{x: leftPosition, y: topPosition}}
        > 
        <S.Container posn={posn} ref={forwardedRef} id={name}>
          {name}
          <br/>
          {`x: ${state.deltaPosition.x.toFixed(0)}, y: ${state.deltaPosition.y.toFixed(0)}`}
        </S.Container>
      </Draggable>
    </>
  );
}
