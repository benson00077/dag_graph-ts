import React, { useState, useEffect } from "react";
import Graph from "../../dag/graphClass"
import { input } from "../../ts/types/app_types";
import inputParser from '../utils/inputParser';

type setDag = {
  createVertex: (input: input) => boolean,
  deleteVertex: (name: string) => void,
  appendVertexValue: (name: string, value: string) => void,
  resetDag: () => void,
}
type dagCtx = [Graph, setDag, boolean, React.Dispatch<React.SetStateAction<boolean>> | (() => {})]

type dagMapLocalStorage = {
  [name: string] : {
    rank : number,
    value: string | null,
    incomingNames : string[],
  }
}

export const DagContext = React.createContext<dagCtx>([
  {} as Graph,
  {} as setDag,
  false,
  () => { }
]);

type DagContextProviderProps = {
  setlocalStorage: (dagData: string) => void,
  children: React.ReactNode
}

/**
 *  Encapsulate CRUD on DAG in Context API because 
 *   1. Methods of CRUD on DAG is within this DAG object, instead of React. React needs to know if any updates on this obj.
 *   2. CRUD on DAG is coupling w/ window.localStorage, which is not known by React either.
 */
export const DagContextProvider = ({ setlocalStorage, children }: DagContextProviderProps) => {

  /** 
   *  Since we use dag class's method to update vertex vlaue,
   *  React would not know the update of dag unless having a update state 
   *  to inform react to rerender CreateVertex.tsx where we import dag data
   */
  const [update, setUpdate] = useState(false)
  const [dag, _setDag] = useState<Graph>(new Graph())
  const setDag = {
    createVertex,
    deleteVertex,
    appendVertexValue,
    resetDag,
  }

  const updateDagLocalStorage = (dag: Graph) => {
    const map : dagMapLocalStorage = {}
    dag.names.forEach((name) => {
      map[name] = {
        rank: dag.rank[name],
        value: dag.vertices[name].value ?? null,
        incomingNames: dag.vertices[name].incomingNames
      }
    })
    const mapStr = JSON.stringify(map)
    setlocalStorage(mapStr)
  }

  const repaintPrevDag = () => {
    const prevDagData = window.localStorage.getItem("dagData")
    if (prevDagData === null || prevDagData === "null" || prevDagData === '') return
    const map : dagMapLocalStorage = JSON.parse(prevDagData)
    for (let [name, value] of Object.entries(map)) {
      dag.map(name, map[name].value)
      value.incomingNames.forEach((incomingName) => {
        dag.addEdge(incomingName, name)
      })
    }
    dag.giveRank()
    setUpdate(!update)
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
    updateDagLocalStorage(dag)
    return true
  }

  function deleteVertex(name: string) {
    if (!dag.names.includes(name)) {
      alert(`Tag >>> ${name} <<< not exist !`)
      return
    }
    dag.delete(name)
    setUpdate(!update)
    updateDagLocalStorage(dag)
  }

  function appendVertexValue(name: string, value: string) {
    dag.map(name, value)
    setUpdate(!update)
    updateDagLocalStorage(dag)
  }

  function resetDag() {
    setlocalStorage('')
    setUpdate(!update)
    /**
     *  to inform DrawGraph.tsx dag is changed and update UI
     */
    _setDag(() => new Graph())
  }

  useEffect(() => {
    repaintPrevDag()
  }, [])

  return (
    <DagContext.Provider value={[dag, setDag, update, setUpdate]}>
      {children}
    </DagContext.Provider>
  )
}