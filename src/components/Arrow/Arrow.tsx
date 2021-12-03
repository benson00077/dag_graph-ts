import React, { useEffect, useContext } from "react";
//import useDrawConnector from "./useDrawConnector";
//import useDrawConnector from "./useDrawConnector_origin";
import { PositionContext } from "../contexts/PositionContext";


export default function Arrow(props: {
  incommingName: string,
  name: string,
  forwardedRef: React.MutableRefObject<any>,
  forwardedDivsRef: React.RefObject<HTMLDivElement>[],
}) {
  const {incommingName, name, forwardedRef, forwardedDivsRef} = props

  let [positionMap] = useContext(PositionContext);
  //const { drawConnectorInitial } = useDrawConnector();


  return (
    <g
      fill="none"
      stroke="black"
      strokeWidth="2"
      markerEnd="url(#arrowhead)"
      style={{ position: `absolute` }}
    >
      <path
        ref={forwardedRef}
        id={`arrowLeft_${name}_${incommingName}`}
        // vertex_from={incommingName}
        // vertex_to={name}
      />
    </g>
  );
}