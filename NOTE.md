- [TODO](#todo)
- [👉 About dark/light theme w/ Styled Component](#-about-darklight-theme-w-styled-component)
  - [Style](#style)
- [👉 TypeScript in general](#-typescript-in-general)
  - [Default Props in Functional Component by TypeScript](#default-props-in-functional-component-by-typescript)
- [👉 About Draggable](#-about-draggable)
  - [App](#app)
    - [介面關注點：使用者呼叫的零件](#介面關注點使用者呼叫的零件)
  - [Draggable](#draggable)
    - [介面關注點：xy座標位置，以及 css](#介面關注點xy座標位置以及-css)
  - [DraggableCore](#draggablecore)
    - [介面關注點：事件監聽、根據拖曳的上一動xy座標計算 coreData 傳遞給 cb](#介面關注點事件監聽根據拖曳的上一動xy座標計算-coredata-傳遞給-cb)
- [👉 note](#-note)
  - [當沒有參數傳入函數](#當沒有參數傳入函數)
  - [React中优雅的处理doubleClick](#react中优雅的处理doubleclick)

# TODO

- SVG arrows on Drag (see useDrawConnectorDynamic)
  - 利用閉包來做 Memoizer
- ⭕ update vertex name (double click)
  - 利用 vertex name / value 資料結構 - 僅顯示端顯示沒問題
  - 處理 click / double click 兩者，利用可取消的 Promise
- ⭕ delete vertex (maybe hover over trash can icon) -- instance of class 造成 uncontorlled component 
  - 封裝在 dagContext 內，並新增 update state 通知 React dag 內部已經修改
- ⭕ bar select different arrows style


# 👉 About dark/light theme w/ Styled Component

## Style

- css var() and :root{} vairables
- input:checked css selector
- Styled Components Passed props w/ TypeScript
  - `color: ${ ({theme}) => theme.background};` in `global.ts` ❓
  - `left: ${( {posn}) => posn.top};` in `Vertex/style.ts` ❓
  - export default `withTheme(globalStyle)` ❓ 注意他的 HOC
- import \* as S from './style' help to hightlight styled component
- data-attribute: see Arrow.tsx & [here](https://stackoverflow.com/a/44569018/16124226)

# 👉 TypeScript in general

## Default Props in Functional Component by TypeScript

- [Using function dot notion](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/)
- [Usiing Partial<Type>](https://dev.to/bytebodger/default-props-in-react-typescript-2o5o)
  - [`-?` in TypeScript](https://stackoverflow.com/a/52417260/16124226)


# 👉 About Draggable

## App
### 介面關注點：使用者呼叫的零件
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
### 介面關注點：xy座標位置，以及 css
```jsx
  const [ state, setState ] = useState({
    dragging: false,
    dragged: false,
    // Current transform x and y, default or from props
    x: props.defaultPosition?.x || props.position?.x || args.position.x ,
    y: props.defaultPosition?.y || props.position?.y || args.position.y ,
  });
```
- onDragStart: 
  - 基本只關注 state.dragging, state.dragged
  - 封裝父層 onStart
  - shouldStart: 
- onDrag: 封裝父層 onDrag
  - 接收 coreData 在 DraggableCore 內被註冊事件
  - 依照 coreData 更新 state.x , state.y
  - shouldUpdate: 
- onDragStop: 封裝父層 onStop
  - 接收 coreData 在 DraggableCore 內被註冊事件
  - 依照 coreData 更新 state.x , state.y
  - shouldContinue: 
- controlled: ❓

## DraggableCore
### 介面關注點：事件監聽、根據拖曳的上一動xy座標計算 coreData 傳遞給 cb
```tsx
 const [state, setState] = useState({
    dragging: false,
    lastX: NaN,
    lastY: NaN,
  });

  // 傳遞 coreEvet (coreData)
  { 
    node: HTMLElement,
    deltaX: number, // state.lastX - evt.clientX - offsetParent.getBoundingClientRect().left
    deltaY: number // state.lastY -  evt.clientY - offsetParent.getBoundingClientRect().top
    lastX: number, // state.lastX
    lastY: number, // state.lastY
    x: number, // ~= evt.clientX - offsetParent.getBoundingClientRect().left
    y: number, // ~= evt.clientY - offsetParent.getBoundingClientRect().top
  }
```
- handleDragStart: 
  - 註冊於事件監聽的主函數
  - 封裝並呼叫父層 Draggable 的 cb : onDragStart，傳遞 coreData
  ```jsx
  setState({
    dragging: true, 
    lastX: x, // ~= evt.clientX - offsetParent.getBoundingClientRect().left
    lastY: y  // ~= evt.clientY - offsetParent.getBoundingClientRect().top
  })
  ```
  - shouldStart: 
- handleDrag: 
  - 註冊於事件監聽的主函數
  - 封裝並呼叫父層 Draggable 的 cb : onDrag，傳遞 coreData
  ```jsx
  setState({
    dragging: true, 
    lastX: x, // ~= evt.clientX - offsetParent.getBoundingClientRect().left
    lastY: y  // ~= evt.clientY - offsetParent.getBoundingClientRect().top
  })
  ```
  - shouldUpdate: 
- handleDragStop: 
  - 註冊於事件監聽的主函數
  - 封裝並呼叫父層 Draggable 的 cb : oonDragStop，傳遞 coreData
  ```jsx
  setState({
    dragging: true, 
    lastX: x, // NaN
    lastY: y  // NaN
  })
  ```
  - shouldUpdate: 
- useEffect: 實現事件監聽
  -  ❓ 還是沒很懂 useEffect 內 add / remove EventListener 的機制 
  -  麻煩在於 Handle forwarded ref (初始化的時候 ref 會是 null) ，所以才要再 useEffect 內傳遞 forwarded ref 給函數，確保它不會是 null & under controll，所以 handleDragStart 才會多一個參數需要傳 forwarded ref 進去。

# 👉 note
## 當沒有參數傳入函數
[see here](https://stackoverflow.com/questions/11107823/what-happens-if-i-dont-pass-a-parameter-in-a-javascript-function)

## React中优雅的处理doubleClick
[here](https://segmentfault.com/a/1190000020057512)