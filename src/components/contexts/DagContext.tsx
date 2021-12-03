import React, { useState } from "react";
import { contextProps } from "./types"
import Graph from "../../dag/graphClass"


export const DagContext = React.createContext({} as Graph);

export const DagContextProvider = (props: contextProps) => {

  const [dag] = useState(new Graph())

  return (
    <DagContext.Provider value={dag}>
      {props.children}
    </DagContext.Provider>
  )
}