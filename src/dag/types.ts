export type vertexValue = null | string | number
export type Vertex = {
  name: string;
  incoming: {
    [name: string] : Vertex
  };
  incomingNames: string[];
  hasOutgoing: boolean;
  value: vertexValue;
}
export type Vertices = {
  [name: string] : Vertex
}

export interface IdagData {
  names: string[];
  vertices: {
    [name: string]: Vertex
  }
  rank?: {
    [name: string] : number
  }
  topSorted?: string[]
}
