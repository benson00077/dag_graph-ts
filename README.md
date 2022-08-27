<a name="readme-top"></a>
<details>
  <summary>📔 Table of Contents</summary>

- [1. About the porject](#1-about-the-porject)
  - [1.1. Build with](#11-build-with)
    - [1.1.1. Tech Stack](#111-tech-stack)
    - [1.1.2. Features](#112-features)
      - [1.1.2.1. CRUD on items](#1121-crud-on-items)
      - [1.1.2.2. Interactions](#1122-interactions)
- [2. Getting Started](#2-getting-started)
  - [2.1. Prerequisites](#21-prerequisites)
  - [2.2. Installation](#22-installation)
- [3. Usage](#3-usage)
- [4. Roadmap](#4-roadmap)
- [5. Acknowledgments](#5-acknowledgments)
  - [5.1. About DAG](#51-about-dag)
  - [5.2. About this project](#52-about-this-project)
    - [5.2.1. Dev Logs](#521-dev-logs)
    - [5.2.2. Directory Structure](#522-directory-structure)

</details>

<!-- ABOUT THE PROJECT -->

# 1. About the porject

![image](https://github.com/benson00077/dag_graph-ts/blob/main/public/demo-create.gif)

Give item's tag name and it's incomming/outgoing items' name,
to get a graph (DAG, or Directed Acyclic Graph)
that shows the visualized dependencies graph among these items.

## 1.1. Build with

### 1.1.1. Tech Stack

[![TypeScript][typescript]][typescript-url]
[![React][react.js]][react-url]
[![Styled Component][styled-component]][styled-component-url]

### 1.1.2. Features

#### 1.1.2.1. CRUD on items

- Create items by Tags and their edges (arrows / dependencies)
- Update item's title by double click
- Delete item and its edges (arrows)
  - delete all
  - delete by Tag

#### 1.1.2.2. Interactions

- Drag and drop support
- Select arrows style
- Dark/Light mode
- Local storage to keep items datas between sessions

<p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

# 2. Getting Started

## 2.1. Prerequisites

Node version v14.17.0

## 2.2. Installation

1. Clone the repo
   ```sh
   git clone https://github.com/benson00077/dag_graph-ts.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

<!-- USAGE  -->

# 3. Usage

![image](https://github.com/benson00077/dag_graph-ts/blob/main/public/demo-others.gif)

- Basic CRUD on items
- Drag and drop support
- Select arrows style
- Dark/Light mode
- Local storage to keep items datas between sessions

<p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

<!-- ROADMAP -->

# 4. Roadmap

- [x] useDrawConnectorDynamic 利用閉包來做 Memoizer
- [x] update vertex name (double click)
  - 利用 vertex name / value 資料結構 - 僅顯示端顯示沒問題
  - 處理 click / double click 兩者，利用可取消的 Promise
- [x] delete vertex (maybe hover over trash can icon) -- instance of class 造成 uncontorlled component
  - 封裝在 dagContext 內，並新增 update state 通知 React dag 內部已經修改
- [x] bar select different arrows style

<p align="right">(<a href="#user-content-readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

# 5. Acknowledgments

## 5.1. About DAG

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

## 5.2. About this project

### 5.2.1. Dev Logs

- [My prototype project](https://github.com/benson00077/dag_graph)
- [Personal Notes](NOTE.md)

### 5.2.2. Directory Structure

<details>
  <summary>🌲 Directory Structure</summary>

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

</details>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org
[react-url]: https://reactjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://v5.reactrouter.com/web/guides/quick-start
[mui-url]: https://mui.com/material-ui/getting-started/overview/
[mui]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[styled-component-url]: https://styled-components.com/docs
[styled-component]: https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[sass]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[sass-url]: https://sass-lang.com
[nest.js]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
