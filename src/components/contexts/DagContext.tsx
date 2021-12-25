import React, { useState } from "react";
import { contextProps } from "./types"
import Graph from "../../dag/graphClass"
import { input } from "../../ts/types/app_types";
import inputParser from '../utils/inputParser';

type setDag = {
  createVertex: (input: input) => boolean,
  deleteVertex: (name: string) => void,
  appendVertexValue: (name: string, value: string) => void,
}
type dagCtx = [Graph, setDag , boolean, React.Dispatch<React.SetStateAction<boolean>> | (() => {})]

export const DagContext = React.createContext<dagCtx>([
  {} as Graph, 
  {} as setDag, 
  false,
  () => {}
]);

export const DagContextProvider = (props: contextProps) => {

  /** Since we use dag class's method to update vertex vlaue,
   *  React would not know the update of dag unless having a update state 
   *  to inform react to rerender CreateVertex.tsx where we import dag data
   */
  const [update, setUpdate] = useState(false)   
  const [dag] = useState<Graph>(new Graph())
  const setDag = {
    createVertex,
    deleteVertex,
    appendVertexValue
  }

  function createVertex(input: input) {
    if (!input.vertex) {
      alert(`Vertex Name must not be empty`)
      return false
    }
    let { incomming, vertex, outgoing } = inputParser(input)
    const value = dag.vertices[vertex] ? dag.vertices[vertex].value : null
    try {
      dag.addEdges(vertex, value, outgoing, incomming)
      dag.giveRank()
    } catch (err) {
      alert(err)
      return false
    }
    setUpdate(!update)
    return true
  }

  function deleteVertex(name: string) {
    if (!dag.names.includes(name)) {
      alert(`Tag >>> ${name} <<< not exist !`)
      return
    }
    dag.delete(name)
    setUpdate(!update)
  }

  function appendVertexValue(name: string, value: string) {
    dag.map(name, value)
    setUpdate(!update)
  }

  return (
    <DagContext.Provider value={[dag, setDag, update, setUpdate]}>
      {props.children}
    </DagContext.Provider>
  )
}