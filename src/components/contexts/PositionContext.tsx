import React, { useState } from "react";
import { contextProps } from "./types"

type posnMap = {
  [vertex: string]: {
    posnOrigin: [number, number],
    posnNew: [number, number],
    translate: { x: number, y: number }
  }
}

type posnCtx = [posnMap, React.Dispatch<React.SetStateAction<posnMap>> | (() => {})]
// (posnMap | React.Dispatch<React.SetStateAction<posnMap>>)[]
// [posnMap, React.Dispatch<React.SetStateAction<posnMap>>]

export const PositionContext = React.createContext<posnCtx>([{}, () => {}]);

export const PositionContextProvider = (props: contextProps) => {
  const [positionMap, setPositionMap] = useState<posnMap>({})

  return (
    <PositionContext.Provider value={[positionMap, setPositionMap]}>
      {props.children}
    </PositionContext.Provider>
  )
}
