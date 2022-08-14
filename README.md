- [1. Usage (Features)](#1-usage-features)
  - [1.1. CRUD on items](#11-crud-on-items)
  - [1.2. Others](#12-others)
- [2. About](#2-about)
  - [2.1. About DAG](#21-about-dag)
  - [2.2. About this project](#22-about-this-project)
    - [2.2.1. Dev Logs](#221-dev-logs)
    - [2.2.2. Directory Structure](#222-directory-structure)

# 1. Usage (Features)

    Give item's tag name and it's incomming/outgoing items' name,
    to get a graph (DAG, or Directedd Acyclic Graph)
    that shows the visualized direction dependencies.

## 1.1. CRUD on items

- Create items by Tags and their edges (arrows / dependencies)
  ![image](https://github.com/benson00077/dag_graph-ts/blob/main/public/demo-create.gif) <br />
- Update item's title by double click
- Delete item and its edges (arrows)
  - delete all
  - delete by Tag

## 1.2. Others

- Drag and drop support
- Select arrows style
- Dark/Light mode
- Local storage to keep items datas between sessions
  ![image](https://github.com/benson00077/dag_graph-ts/blob/main/public/demo-others.gif) <br />

# 2. About

## 2.1. About DAG

    Directedd Acyclic Graph

- 舉例，按照以下順序創建 vertex ，箭頭 → 表示彼此流向關係:
  | Incomming | → Vertex → | Outgoing
  | ------ | ------ | ------ |
  | | Benson | Alice |
  | | Alice | Catherine|
  | Ben | Benson | Catherine|
  | Eva | Benson | David |
  |[ Ben, Flora ] | Catherine | [ David, George ]|

- V.1 See example below
  ![image](https://github.com/benson00077/dag_graph/blob/main/public/demo/demo2.png)

- `graph.vertices` Object by `console.table()` :

```zsh
┌───────────┬─────────────┬───────────────────────────────────────────┬────────────────────────────────┬─────────────┬───────┐
│  (index)  │    name     │                 incoming                  │         incomingNames          │ hasOutgoing │ value │
├───────────┼─────────────┼───────────────────────────────────────────┼────────────────────────────────┼─────────────┼───────┤
│  Benson   │  'Benson'   │     { Ben: [Object], Eva: [Object] }      │        [ 'Ben', 'Eva' ]        │    true     │ null  │
│   Alice   │   'Alice'   │           { Benson: [Object] }            │          [ 'Benson' ]          │    true     │ null  │
│ Catherine │ 'Catherine' │                 [Object]                  │ [ 'Alice', 'Benson', 'Flora' ] │    true     │ null  │
│    Ben    │    'Ben'    │                    {}                     │               []               │    true     │ null  │
│   David   │   'David'   │ { Benson: [Object], Catherine: [Object] } │   [ 'Benson', 'Catherine' ]    │    false    │ null  │
│    Eva    │    'Eva'    │                    {}                     │               []               │    true     │ null  │
│  George   │  'George'   │          { Catherine: [Object] }          │        [ 'Catherine' ]         │    false    │ null  │
│   Flora   │   'Flora'   │                    {}                     │               []               │    true     │ null  │
└───────────┴─────────────┴───────────────────────────────────────────┴────────────────────────────────┴─────────────┴───────┘
```

- `graph.rank` Object by `console.table()` :

```zsh
┌───────────┬────────┐
│  (index)  │ Values │
├───────────┼────────┤
│  George   │   0    │
│   David   │   0    │
│ Catherine │   1    │
│   Flora   │   2    │
│   Alice   │   2    │
│  Benson   │   3    │
│    Eva    │   4    │
│    Ben    │   4    │
└───────────┴────────┘
```

## 2.2. About this project

### 2.2.1. Dev Logs

- playing around with DAG using typescript
- css-in-js using styled component
- More details: see my [prototype project](https://github.com/benson00077/dag_graph)
- Personal notes: see [here](NOTE.md)

### 2.2.2. Directory Structure

```sh
./src/components/
├── Arrow
│   └── Arrow.tsx
├── ArrowRenderer.tsx
├── DeleteVertex # 🔺 Controller on DAG
│   ├── DeleteVertex.tsx
│   └── style.ts
├── Draggble
│   ├── Draggable.tsx
│   ├── DraggableCore.tsx
│   ├── domFns.ts
│   ├── draggable.test.tsx
│   ├── log.ts
│   ├── positionFns.ts
│   └── types.ts
├── DrawGraph.tsx # 🔺 View on DAG
├── GraphMiddleWare.tsx # 🔺
├── InputForm # 🔺 Controller on DAG
│   ├── VertexInput.tsx
│   └── styles.ts
├── ResetDag # 🔺 Controller on DAG
│   ├── ResetDag.tsx
│   └── style.ts
├── SelectArrowStyle
│   ├── SelectArrowStyle.tsx
│   └── style.ts
├── TogglerButton
│   ├── ToggleButton.tsx
│   └── styles.ts
├── Vertex
│   ├── Rename.tsx
│   ├── Vertex.tsx
│   └── styles.ts
├── VertexRenderer.tsx
├── contexts
│   ├── DagContext.tsx
│   ├── PositionContext.tsx
│   ├── ThemeContext.tsx
│   └── types.ts
├── hooks
│   ├── useCancellablePromises.ts
│   ├── useDagStorage.ts
│   ├── useDrawSVGConnector.ts
│   └── useThemeMode.ts
├── styles
│   ├── global.ts
│   └── themes.ts
└── utils
    ├── arrowsInfoGetter.ts
    ├── cancellablePromise.ts
    ├── inputParser.ts
    ├── svgPathHandler.ts
    └── uitls.test.ts
```
