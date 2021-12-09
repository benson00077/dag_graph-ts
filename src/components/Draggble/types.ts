import { ReactElement } from "react";
import { ControlPosition, PositionOffsetControlPosition } from "./domFns";

/**
 * For default props
 * Partial<Type>
 */ 
export type AllPropsRequired<Object> = {
  [Property in keyof Object]-?: Object[Property];
}


/**
 * For DraggableCore.tsx
 */
export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
}

type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;

export type DraggableCoreDefaultProps = {
  allowAnyClick?: boolean,
  disabled?: boolean,
  enableUserSelectHack?: boolean,
  onStart?: DraggableEventHandler,
  onDrag?: DraggableEventHandler,
  onStop?: DraggableEventHandler
  onMouseDown?: (e: MouseEvent) => void,
  scale?: number,
}

export type DraggableCoreProps = DraggableCoreDefaultProps &  {
  forwardedRef: { current: HTMLDivElement };
  children: ReactElement;
  // cancle?: string,
  // offsetParent?: HTMLElement, 
  // grid?: [number, number],
  // handle?: string,
  // nodeRef?: React.ElementRef<any>
};


/**
 * For Draggable.tsx
 */
export type DraggableDefaultProps = {
  axis?: 'both' | 'x' | 'y' | 'none',
  defaultClassName?: string,
  defaultClassNameDragging?: string,
  defaultClassNameDragged?: string,
  defaultPosition?: ControlPosition,
}

export type DraggableProps = DraggableCoreProps & DraggableDefaultProps & {
  positionOffset?: PositionOffsetControlPosition,
  position?: ControlPosition
}
