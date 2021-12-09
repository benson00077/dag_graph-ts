import { useState } from "react";
import { PositionContextProvider } from "./contexts/PositionContext";
import { input } from "../ts/types/app_types";
import VertexInput from "./InputForm/VertexInput";
import CreateVertex from "./CreateVertex"
import { DagContextProvider } from "./contexts/DagContext";

function GraphMiddleWare() {
  const [verticesInput, setVerticesInput] = useState<input>({
    vertex: "",
    incomming: "",
    outgoing: "",
  });

  return (
    <>
      <DagContextProvider>
        <PositionContextProvider>
          <CreateVertex verticesInput={verticesInput} />
          <VertexInput setVerticesInput={setVerticesInput} />
        </PositionContextProvider>
      </DagContextProvider>
    </>
  );
}

export default GraphMiddleWare;