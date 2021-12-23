import { useContext, Fragment } from 'react'
import { DagContext } from './contexts/DagContext';

import { input } from "../ts/types/app_types";
import DrawGraph from './DrawGraph';
import inputParser from './utils/inputParser';

type CreactVertexProps = {
  verticesInput: input
}


export default function CreateVertex({ verticesInput }: CreactVertexProps) {

  const [dag] = useContext(DagContext)

  function createVertex() {
    let { incomming, vertex, outgoing } = inputParser(verticesInput)
    const value = dag.vertices[vertex] ? dag.vertices[vertex].value : null
    dag.addEdges(vertex, value, outgoing, incomming)
  }

  if (verticesInput.vertex) {
    try {
      createVertex()
      dag.giveRank()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Fragment>
      <DrawGraph dag={dag} topSorted={dag["topSorted"]} />
    </Fragment>
  )
}