import { useContext, Fragment } from 'react'
import { DagContext } from './contexts/DagContext';

import { input } from "../ts/types/app_types";
import DrawGraph from './DrawGraph';
import inputHandler from '../utils/inputHandler';

type CreactVertexProps = {
  verticesInput: input
}


export default function CreateVertex({verticesInput}: CreactVertexProps) {

  const dag = useContext(DagContext)

  function createVertex() {
    let { incomming, vertex, outgoing } = inputHandler(verticesInput)
    dag.addEdges(vertex, null, incomming, outgoing)
  }

  if (verticesInput.vertex) {
    try {
      createVertex()
      dag.giveRank()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Fragment>
      <DrawGraph dag={dag} topSorted={dag["topSorted"]}/>
    </Fragment>
  )
}