
# About this project

- TBD 
- Delete Vertex ? dag class

# About dark/light theme w/ Styled Component

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


# About Draggable

## App

- activeDrags: 計算拖曳幾次
- dletaPosition
- controlledPosition: {x: -400, y: 200}

## Draggable

## DraggableCore
- ShouldUpdate
- ShouldContinue
- 還是沒很懂 useEffect 內 add / remove EventListener 的機制 