import React, { useState, useEffect } from "react";
import { addEvent, addUserSelectStyles, removeEvent, removeUserSelectStyles, withControlledNodeRef } from "./domFns";
import log from "./log";
import { getControlPosition, createCoreData } from "./positionFns";
import { AllPropsRequired, DraggableCoreProps } from "./types";

const eventsFor = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend",
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup",
  },
};

let dragEventFor = eventsFor.mouse;

export default function DraggableCore(props: DraggableCoreProps) {

  //Default Props
  const args: AllPropsRequired<DraggableCoreProps> = {
    ...props,
    allowAnyClick: props.allowAnyClick ?? false,
    disabled: props.disabled ?? false,
    enableUserSelectHack: props.enableUserSelectHack ?? true,
    onStart: props.onStart ?? (() => {}),
    onDrag: props.onDrag ?? (() => {}),
    onStop: props.onStop ?? (() => {}),
    onMouseDown: props.onMouseDown ?? (() => {}),
    scale: props.scale ?? 1
  }


  const [state, setState] = useState({
    dragging: false,
    lastX: NaN,
    lastY: NaN,
  });



  function handleDragStart(e: MouseEvent, thisNode: HTMLDivElement) {
    const ownerDocument = thisNode.ownerDocument
    const position = getControlPosition(e, thisNode);
    const { x, y } = position;
    const coreEvent = createCoreData(state, x, y, thisNode)

    log('DraggableCore: handleDragStart: %j', coreEvent);

    // Call event handler. If it returns explicit false, cancel.
    log('calling', args.onStart)
    const shouldUpdate = args.onStart(e, coreEvent) 
    if (shouldUpdate === false) return;

    // Add a style to the body to disable user-select. This prevents text from
    // being selected all over the page.
    if (args.enableUserSelectHack) addUserSelectStyles(ownerDocument);

    setState({
      dragging: true, 
      lastX: x,
      lastY: y
    })
  }

  function handleDrag (e: MouseEvent) {
    // Get the current drag point from the event. This is used as the offset.
    const thisNode = args.forwardedRef.current
    if(!thisNode) throw new Error("forwarded reference of vertex is null")
    const position = getControlPosition(e, thisNode)
    let { x, y } = position;
    // Create an event object w/ all the data parents need to make a decision here.
    const coreEvent = createCoreData(state, x, y, thisNode)

    log('DraggableCore: handleDrag: %j', coreEvent)

    // Call event handler. If it returns explicit falase, cancel. -> see example "I don't want to be drag"
    const shouldUpdate = args.onDrag(e, coreEvent)
    if (shouldUpdate === false ) {
      try {
        handleDragStop(new MouseEvent('mouseup'))
      } catch (err) {
        // Old browers
        const event = ((document.createEvent('MouseEvents')))
        event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        handleDragStop(event);
      }
      return
    }

    setState((prev) =>({
      ...prev,
      lastX: x, 
      lastY: y
    }))

  }

  function handleDragStop(e: MouseEvent) {
    
    if (!state.dragging) return; // return when re-render after setState in this function.

    const thisNode = args.forwardedRef.current;
    if(!thisNode) throw new Error("forwarded reference of vertex is null")
    const ownerDocument = thisNode.ownerDocument
    const position = getControlPosition(e, thisNode);
    const {x, y} = position;
    const coreEvent = createCoreData(state, x, y, thisNode);

    // Call event handler
    const shouldContinue = args.onStop(e, coreEvent);
    if (shouldContinue === false ) return false;

    // Remove user-select hack
    if (args.enableUserSelectHack) {
      removeUserSelectStyles(ownerDocument);
    };

    log('DraggableCore: handleDragStop: %j', coreEvent)

    setState({
      dragging: false,
      lastX: NaN,
      lastY: NaN,
    });

  }

  //TODO: onTouchStart() , onTAouchEnd(), change eventsFor 
  function onMouseDown(e: MouseEvent) {
    dragEventFor = eventsFor.mouse;
    //return handleDragStart(e);
  }
  function onMouseUp(e: MouseEvent) {
    dragEventFor = eventsFor.mouse;
    //return handleDragStop(e);
  }
  

  useEffect(() => {
    const thisNode = args.forwardedRef.current;
    if(!thisNode) throw new Error("forwarded reference of vertex is null")
    const ownerDocument = thisNode.ownerDocument
    
    addEvent(thisNode, dragEventFor.start, withControlledNodeRef(thisNode, handleDragStart), {passive: false});
    if (state.dragging) {
      // thisNode is controlled when dragging, thus no need withControlledNodeRef to wrap the handler.
      addEvent(ownerDocument, dragEventFor.move, handleDrag)
      addEvent(ownerDocument, dragEventFor.stop, handleDragStop)
    }

    return () => {
      removeEvent(thisNode, dragEventFor.start, withControlledNodeRef(thisNode, handleDragStart), {passive: false})
      removeEvent(ownerDocument, dragEventFor.move, handleDrag)
      removeEvent(ownerDocument, dragEventFor.stop, handleDragStop)
      if (args.enableUserSelectHack) removeUserSelectStyles(ownerDocument)
    }
  }, [state.dragging]);

  return (
    <>
      {/* {React.cloneElement(React.Children.only(args.children), {
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
      })} */}
      {args.children}
    </>
  );
}
