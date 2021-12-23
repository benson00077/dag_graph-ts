import React, { useState } from "react";
import { contextProps } from "./types"
import Graph from "../../dag/graphClass"


type dagCtx = [Graph, boolean, React.Dispatch<React.SetStateAction<boolean>> | (() => {})]

export const DagContext = React.createContext<dagCtx>([{} as Graph, false, () => { }]);

export const DagContextProvider = (props: contextProps) => {

  const [dag] = useState<Graph>(new Graph())
  /** Since we use dag class's method to update vertex vlaue,
   *  React would not know the update of dag unless having a update state 
   *  to inform react to rerender CreateVertex.tsx where we import dag data
   */
  const [update, setUpdate] = useState(false) 

  return (
    <DagContext.Provider value={[dag, update, setUpdate]}>
      {props.children}
    </DagContext.Provider>
  )
}