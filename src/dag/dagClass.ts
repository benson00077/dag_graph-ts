import { vertexValue, Vertex, Vertices } from './types'

export default class Dag {
  names: string[]
  vertices: Vertices

  constructor() {
    this.names = []
    this.vertices = {}
  }

  add(name: string) {
    //if(!name) return
    if (this.vertices.hasOwnProperty(name)) return this.vertices[name]

    let vertex: Vertex = {
      name: name,
      incoming: {},
      incomingNames: [],
      hasOutgoing: false,
      value: null,
    }

    this.vertices[name] = vertex
    this.names.push(name)
    return vertex
  }

  map(name: string, value: vertexValue) {
    this.add(name).value = value
  }

  visit(
    vertex: Vertex,
    fn: (vertex: Vertex, path: string[]) => void,
    visited?: { [name: string]: boolean },
    path?: string[],
  ) {
    let [name, vertices, names] = [vertex.name, vertex.incoming, vertex.incomingNames]

    if (!visited) visited = {}
    if (!path) path = []

    if (visited.hasOwnProperty(name)) return

    path.push(name)
    visited[name] = true

    for (let incomingName of names) {
      this.visit(vertices[incomingName], fn, visited, path)
    }
    fn(vertex, path)
    path.pop()
  }

  addEdge(fromName: string, toName: string) {
    if (!fromName || !toName || fromName === toName) return
    let from = this.add(fromName)
    let to = this.add(toName)
    if (to.incoming.hasOwnProperty(fromName)) return

    const checkCycle = (vertex: Vertex, path: string[]) => {
      if (vertex.name === toName) {
        throw new Error('cycle detected: ' + toName + ' <- ' + path.join(' <- '))
      }
    }

    this.visit(from, checkCycle)
    from.hasOutgoing = true
    to.incoming[fromName] = from
    to.incomingNames.push(fromName)
  }

  addEdges(name: string, value: vertexValue, before?: string | string[], after?: string | string[]) {
    this.map(name, value)
    if (before) {
      if (typeof before === 'string') {
        this.addEdge(name, before)
      }
      if (Array.isArray(before)) {
        before.forEach((beforeName) => {
          this.addEdge(name, beforeName)
        })
      }
    }
    if (after) {
      if (typeof after === 'string') {
        this.addEdge(after, name)
      }
      if (Array.isArray(after)) {
        after.forEach((afterName) => {
          this.addEdge(afterName, name)
        })
      }
    }
  }

  topsort(fn: (vertex: Vertex, path: string[]) => void) {
    let visited = {}
    let [vertices, names] = [this.vertices, this.names]

    for (let name of names) {
      let vertex = vertices[name]
      if (!vertex.hasOutgoing) {
        this.visit(vertex, fn, visited)
      }
    }
  }
}
