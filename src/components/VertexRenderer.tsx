import { IdagData } from "../dag/types";
import { RefsArrows, RefsDiv } from "../ts/types/app_types";

import Vertex from "./Vertex/Vertex";

type vertexRendererParas = {
  dag: IdagData;
  refs: [React.MutableRefObject<RefsDiv>, React.MutableRefObject<RefsArrows>]; // [...{current: [..., {current: Ele} ]}]
};

export default function vertexRenderer({
  dag,
  refs,
}: vertexRendererParas) {
  const [rank, topSorted] = [dag.rank, dag.topSorted]
  if (!rank || !topSorted) return;
  const graphHeight = rank[`${topSorted[0]}`];
  const rowProcssedTimes: { [key: number]: number } = {}; //作為每一行div是否render過的計數器
  const [refsDivs, refsArrows] = refs;

  return (
    // 按照拓墣排序迭代每個 vertex，同時紀錄他們所在階層 currentRow
    topSorted.map((name, i) => {
      let row = graphHeight - rank[name]; // 代表該 vertex name 在第幾行
      rowProcssedTimes[row] = rowProcssedTimes[row] + 1 || 1; // Record to kwow current vertex is in n'th column
      let column = rowProcssedTimes[row];

      return (
        <Vertex
          name={name}
          value={dag.vertices[name].value}
          key={name}
          location={[row, column]}
          forwardedRef={refsDivs.current[i]}
          forwardedArrowsRefs={refsArrows.current}
        />
      );
    })
  );
}