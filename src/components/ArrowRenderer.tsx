import arrowsInfoGetter from "../utils/arrowsInfoGetter";
import { IdagData } from "../dag/types"
import Arrow from "./Arrow/Arrow"

export default function arrowRenderer(props: {
  dag: IdagData,
  refs: [React.MutableRefObject<any>, React.MutableRefObject<any>] 
}) {
  const {dag, refs} = props
  const [arrowsRefs, divsRefs] = refs
  const [arrowsRecord, arrowsNumber] = arrowsInfoGetter(dag)

  return [...Array(arrowsNumber)].map((e, i) => (
    <Arrow
      incommingName={arrowsRecord[i].incommingName}
      name={arrowsRecord[i].name}
      key={i}
      forwardedRef={arrowsRefs.current[i]}
      forwardedDivsRef={divsRefs.current}
    />
  ));
};