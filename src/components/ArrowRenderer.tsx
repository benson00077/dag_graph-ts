import arrowsInfoGetter from "./utils/arrowsInfoGetter";
import { IdagData } from "../dag/types"
import Arrow from "./Arrow/Arrow"
import { arrowStyle } from "../ts/types/app_types";

export default function arrowRenderer(props: {
  dag: IdagData,
  refs: [React.MutableRefObject<any>, React.MutableRefObject<any>], 
  arrowStyleOpt: arrowStyle
}) {
  const {dag, refs, arrowStyleOpt} = props
  const [divsRefs, arrowsRefs] = refs
  const [arrowsRecord, arrowsNumber] = arrowsInfoGetter(dag)

  return [...Array(arrowsNumber)].map((e, i) => (
    <Arrow
      incommingName={arrowsRecord[i].incommingName}
      name={arrowsRecord[i].name}
      arrowStyleOpt={arrowStyleOpt}
      key={i}
      forwardedRef={arrowsRefs.current[i]}
      forwardedDivsRef={divsRefs.current}
    />
  ));
};