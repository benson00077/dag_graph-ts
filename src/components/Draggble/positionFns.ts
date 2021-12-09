import { DraggableData } from "./types";
import { offsetXYFromParent } from "./domFns";

export function canDragX(axis: string) {
  return axis === "both" || axis === "x";
}

export function canDragY(axis: string) {
  return axis === "both" || axis === "y";
}

export function getControlPosition(e: MouseEvent, node: HTMLElement) {
  const offsetParent = node.offsetParent || node.ownerDocument.body;
  return offsetXYFromParent(e, offsetParent);
}

// Create an data object exposed by <DraggableCore>'s events
export function createCoreData(
  state: { lastX: number; lastY: number },
  x: number,
  y: number,
  node: HTMLElement
) {
  const { lastX, lastY } = state;
  const isStart = !isNum(lastX);
  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x,
      y,
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node,
      deltaX: x - lastX,
      deltaY: y - lastY,
      lastX: lastX,
      lastY: lastY,
      x,
      y,
    };
  }
}

// Create an data object exposed by <Draggable>'s events
export function createDraggableData(
  draggableState: { dragging: boolean; dragged: boolean; x: number; y: number },
  scale: number,
  coreData: DraggableData
): DraggableData {
  return {
    node: coreData.node,
    x: draggableState.x + (coreData.deltaX / scale),
    y: draggableState.y + (coreData.deltaY / scale),
    deltaX: (coreData.deltaX / scale),
    deltaY: (coreData.deltaY / scale),
    lastX: draggableState.x,
    lastY: draggableState.y,
  }
}

function isNum(num: any): boolean {
  return typeof num === "number";
}
