export type ControlPosition = {x: number, y: number}
export type PositionOffsetControlPosition = {x: number|string, y: number|string}

export function createCSSTransform(contorlPos: ControlPosition, positionOffset: PositionOffsetControlPosition) {
  const translation = getTranslation(contorlPos, positionOffset, 'px');
  return {'transform': translation}
}

export function getTranslation({x,y}: ControlPosition, positionOffset: PositionOffsetControlPosition, unitSuffix: string) {
  let translation = `translate(${x}${unitSuffix},${y}${unitSuffix})`
  if (positionOffset) {
    const defaultX = `${(typeof positionOffset.x === 'string') ? positionOffset.x : positionOffset.x + unitSuffix}`
    const defaultY = `${(typeof positionOffset.y === 'string') ? positionOffset.y : positionOffset.y + unitSuffix}`
    translation = `translate(${defaultX}, ${defaultY}) ` + translation
  }
  return translation
}

export function offsetXYFromParent(evt: MouseEvent, offsetParent: Element): ControlPosition {
 const isBody = offsetParent === offsetParent.ownerDocument.body
 const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

 const x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left);
 const y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top);

 return {x, y}
}

export function addEvent(ele: Node, event: string, handler: (event: any) => void, inputOptions?: Object) {
  const options = {capture: true, ...inputOptions};

  ele.addEventListener(event, handler, options)
}

export function removeEvent (ele: Node, event: string, handler: (event: any) => void, inputOptions?: Object) {
  const options = {capture: true, ...inputOptions}

  ele.removeEventListener(event, handler, options)
}

// Handle ref, access controll ref in useEffect or ref would be default (null)
// In DraggableCore.tsx 
export function withControlledNodeRef(node: HTMLDivElement, handler: (event: any, node: HTMLDivElement) => void) {
  return function eventHandler(event: any) {
    handler(event, node)
  }
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.

// Note we're passing `document` b/c we could be iframed
// Unalbe select while dragging
export function addUserSelectStyles(doc?: Document) {
  if (!doc) return;
  let styleEl = doc.getElementById('draggable-style-el') as HTMLStyleElement;
  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'draggable-style-el';
    styleEl.innerHTML = '.draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
    styleEl.innerHTML += '.draggable-transparent-selection *::selection {all: inherit;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, 'draggable-transparent-selection')
}

export function removeUserSelectStyles(doc?: Document) {
  if (!doc) return
  try {
    if (doc.body) removeClassName(doc.body,'draggable-transparent-selection');
    // Remove selection caused by scroll, unless it's a focused input
    // (we use doc.defaultView in case we're in an iframe)
    const selection = (doc.defaultView || window).getSelection();
    if (selection && selection.type !== 'Caret') {
      selection.removeAllRanges();
    }
  } catch (e) {
    // probably IE
  }
}

export function addClassName(el: HTMLElement, className: string) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
      el.className += ` ${className}`
    }
  }
}

export function removeClassName(el: HTMLElement, className: string) {
  if (el.classList) {
    el.classList.remove(className)
  } else {
    el.className = el.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, 'g'), '');
  }
}