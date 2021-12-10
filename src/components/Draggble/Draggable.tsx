import React, { useState } from "react";
import { createCSSTransform } from "./domFns";
import { canDragX, canDragY, createDraggableData } from "./positionFns";
import { AllPropsRequired, DraggableData, DraggableProps  } from "./types";
import DraggableCore from "./DraggableCore";


export default function Draggable(props: DraggableProps) {

  // Default Props
  const args: AllPropsRequired<DraggableProps> = {
    ...props,
    // from DraggableCore
    allowAnyClick: props.allowAnyClick ?? false,
    disabled: props.disabled ?? false,
    enableUserSelectHack: props.enableUserSelectHack ?? true,
    onStart: props.onStart ?? (() => {}),
    onDrag: props.onDrag ?? (() => {}),
    onStop: props.onStop ?? (() => {}),
    onMouseDown: props.onMouseDown ?? (() => {}),
    scale: props.scale ?? 1,
    // from draggable itself
    defaultClassName: props.defaultClassName !== undefined ? props.defaultClassName : 'draggable',
    defaultClassNameDragging: props.defaultClassNameDragging ?? 'draggable-dragging',
    defaultClassNameDragged: props.defaultClassNameDragged ?? 'draggable-dragged',
    defaultPosition: props.defaultPosition !== undefined ? props.defaultPosition : {x: 0, y: 0},
    positionOffset: props.positionOffset !== undefined ? props.positionOffset : {x: '0%', y: '0%'},
    position: props.position !== undefined ? props.position : {x: 0, y: 0},
    axis: props.axis !== undefined ? props.axis : 'both',
  }

  const [ state, setState ] = useState({
    dragging: false,
    dragged: false,
    // Current transform x and y
    x: props.defaultPosition?.x || props.position?.x || args.position.x ,
    y: props.defaultPosition?.y || props.position?.y || args.position.y ,
    //prevPropsPosition: {...position},
  });

  // TODO: onDrag to change state and thus style would change
  // this will insert and change prop.onDrag  and pass to DraggableCore
  function onDragStart(e: MouseEvent, coreData: DraggableData) {
    // Shourt-circuit if user's callback killed it.
    const shouldStart = args.onStart(e, createDraggableData(state, args.scale, coreData))
    // Kills start event on core as well, so move handlers are never bound
    if (shouldStart === false) return false;

    setState(prev => ({
      ...prev,
      dragging: true,
      dragged: true,
    }))
  }

  function onDrag(e: MouseEvent, coreData: DraggableData) {

    if (!state.dragging) return false
    const uiData = createDraggableData(state, args.scale, coreData);

    const newState = {
      x: uiData.x, 
      y: uiData.y,
    }

    // Short-circuit if user's callback killed it.
    const shouldUpdate = args.onDrag(e, uiData);
    if (shouldUpdate === false) return false;

    setState(prev => ({
      ...prev,
      ...newState
    }))
  }

  function onDragStop(e: MouseEvent, coreData: DraggableData) {
    
    if (!state.dragging) return

    // Shourt-circuit if user's callback killed it.
    const shouldContinue = args.onStop(e, createDraggableData(state, args.scale, coreData));
    if (shouldContinue === false) return false;
    
    const newState: {
      dragging: boolean, 
      x?: number,
      y?: number
    } = {
      dragging: false,
    }

    // TODO: since default props, wether draggable set position or not, this will always be controlled component
    // If this is a controlled component, the result of this operation will be to
    // revert back to the old position. We expect a handler on `onDragStop`, at the least.
    const controlled = Boolean(props.position !== undefined)
    if (controlled) {
      const {x, y} = args.position
      newState.x = x;
      newState.y = y
    }
    
    setState(prev => ({
      ...prev, 
      ...newState
    }))
  }

  // TODO: since default props, wether draggable set position or defaultposition or not, this will always be controlled component
  // If this is controlled, we don't want to move it -- unless it's dragging.
  const controlled = Boolean(props.position !== undefined)
  const draggable = !controlled || state.dragging
  let validPosition = props.position || props.defaultPosition;
  if (validPosition === undefined) validPosition = args.position

  const transformOpts = {
    // props when draggable only horizontally or vertically 
    x: canDragX(args.axis) && draggable ? state.x : validPosition.x,
    y: canDragY(args.axis) && draggable ? state.y : validPosition.y,
  }
  
  const style = createCSSTransform(transformOpts, args.positionOffset);

  // Mark w/ class while dragging
  let className = args.defaultClassName
  if (state.dragging) className += ' ' + args.defaultClassNameDragging
  if (state.dragged) className += ' ' + args.defaultClassNameDragged
  if (args.children.props.className) className += ' ' + args.children.props.className

  return (
    <DraggableCore
      onStart={onDragStart}
      onDrag={onDrag}
      onStop={onDragStop}
      forwardedRef={args.forwardedRef}
    >
      {React.cloneElement(React.Children.only(args.children), {
        className: className,
        style: { ...args.children.props.style, ...style },
      })}
    </DraggableCore>
  );
}