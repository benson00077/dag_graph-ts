# TODO

- update vertex name (maybe double click)
- delete vertex (maybe hover over trash can icon)
- bar select different arrows style

# 👉 About this project

- TBD 
- Delete Vertex ? dag class

# 👉 About dark/light theme w/ Styled Component

## Style

- css var() and :root{} vairables
- input:checked css selector
- Styled Components Passed props w/ TypeScript
  - `color: ${ ({theme}) => theme.background};` in `global.ts`❓
  - `left: ${( {posn}) => posn.top};` in `Vertex/style.ts` ❓
  - export default `withTheme(globalStyle)` ❓ 注意他的 HOC
- import \* as S from './style' help to hightlight styled component
- data-attribute: see Arrow.tsx & [here](https://stackoverflow.com/a/44569018/16124226)

# TypeScript in general

## Default Props in Functional Component by TypeScript

- [Using function dot notion](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/)
- [Usiing Partial<Type>](https://dev.to/bytebodger/default-props-in-react-typescript-2o5o)
  - [`-?` in TypeScript](https://stackoverflow.com/a/52417260/16124226)


# 👉 About Draggable

## App
```jsx
  const [state, setState] = useState({
    activeDrags: 0, // 計算同時拖曳了幾個
    deltaPosition: {x: 0, y:0},
    controlledPosition: {x: -400, y: 200}
  })
```
- OnStart
  - activeDrags
  - Return false: won't be dragged.
- OnStop

## Draggable
```jsx
  const [ state, setState ] = useState({
    dragging: false,
    dragged: false,
    // Current transform x and y, default or from props
    x: props.defaultPosition?.x || props.position?.x || args.position.x ,
    y: props.defaultPosition?.y || props.position?.y || args.position.y ,
  });
```
- onDragStart: 封裝父層 onStart
  - shouldStart: 
- onDrag: 封裝父層 onDrag
  - shouldUpdate: 
- onDragStop: 封裝父層 onStop
  - shouldContinue: 
  - controlled: ❓

## DraggableCore
```jsx
 const [state, setState] = useState({
    dragging: false,
    lastX: NaN,
    lastY: NaN,
  });
```
- handleDragStart: 封裝父層 onDragStart
  - shouldUpdate: 
- handleDrag: 封裝父層 onDrag
  - shouldUpdate: 
- handleDragStop: 封裝父層 onDragStop
  - shouldUpdate: 
- useEffect: 實現事件監聽 ❓ 還是沒很懂 useEffect 內 add / remove EventListener 的機制 