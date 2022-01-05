import { useContext } from 'react'
import { DagContext } from './contexts/DagContext';
import DrawGraph from './DrawGraph';
import DeleteVertex from './DeleteVertex/DeleteVertex';
import VertexInput from "./InputForm/VertexInput";
import ResetDag from './ResetDag/ResetDag';


function GraphMiddleWare() {

  const [dag, setDag] = useContext(DagContext)

  return (
    <>
      <DrawGraph dag={dag} topSorted={dag.topSorted} />
      <VertexInput createVertex={setDag.createVertex} />
      <DeleteVertex deleteVertex={setDag.deleteVertex} />
      <ResetDag reset={setDag.resetDag}/>
    </>
  )
}

export default GraphMiddleWare;