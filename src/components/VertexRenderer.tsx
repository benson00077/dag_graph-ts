import { IdagData } from "../dag/types";
import { RefsArrows, RefsDiv } from "../ts/types/app_types";

import Vertex from "./Vertex/Vertex";

type vertexRendererParas = {
  rank: IdagData["rank"];
  topSorted: IdagData["topSorted"];
  refs: [React.MutableRefObject<RefsDiv>, React.MutableRefObject<RefsArrows>]; // [...{current: [..., {current: Ele} ]}]
};

export default function vertexRenderer({
  rank,
  topSorted,
  refs,
}: vertexRendererParas) {
  if (!rank || !topSorted) return;
  const graphHeight = rank[`${topSorted[0]}`];
  const rowProcssedTimes: { [key: number]: number } = {}; //作為每一行div是否render過的計數器
  const [ refsDivs, refsArrows ] = refs;

  return (
    // 按照拓墣排序迭代每個 vertex，同時紀錄他們所在階層 currentRow
    topSorted.map((name, i) => {
      let row = graphHeight - rank[name]; // 代表該 vertex name 在第幾行
      rowProcssedTimes[row] = rowProcssedTimes[row] + 1 || 1; // Record to kwow current vertex is in n'th column
      let column = rowProcssedTimes[row];

      return (
        <Vertex
          name={name}
          key={name}
          location={[row, column]}
          forwardedRef={refsDivs.current[i]}
          forwardedArrowsRefs={refsArrows.current}
        />
      );
    })
  );
}