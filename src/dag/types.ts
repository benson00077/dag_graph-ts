export type vertexValue = null | string
export type Vertex = {
  name: string
  incoming: {
    [name: string]: Vertex
  }
  incomingNames: string[]
  hasOutgoing: boolean
  value: null | string
}
export type Vertices = {
  [name: string]: Vertex
}

export interface IdagData {
  names: string[]
  vertices: {
    [name: string]: Vertex
  }
  rank?: {
    [name: string]: number
  }
  topSorted?: string[]
}
