import Dag from './dagClass'
import { IdagData, Vertex } from './types'

export default class Graph extends Dag implements IdagData {
  rank: {
    [name: string]: number
  }
  topSorted: string[]

  constructor() {
    super()
    this.rank = {}
    this.topSorted = []
  }

  private topologySortCaller() {
    let result: string[] = []
    super.topsort((vertex, path) => {
      result.push(vertex.name)
    })
    this.topSorted = result
    return result
  }

  private visit_giveRank() {
    let leafToRoot = [...this.topSorted].reverse()
    let ranking = 0
    leafToRoot.forEach((name, i) => {
      let incomingNames = [...this.vertices[name].incomingNames]
      let nextName = leafToRoot[i + 1]
      // when nextName is same ranking
      if (!incomingNames.includes(nextName)) {
        this.rank[name] = ranking
        return
      }
      // when nextName is higher ranking
      if (incomingNames.includes(nextName)) {
        this.rank[name] = ranking
        ranking += 1
        return
      }
    })
  }

  private deleteFromIncomingArr(deleteName: string, vertex: Vertex) {
    vertex.incomingNames = vertex.incomingNames.filter((item) => item !== deleteName)
  }

  private deleteFromIncoming(deleteNameKey: string, vertex: Vertex) {
    delete vertex.incoming[deleteNameKey]
  }

  private getOutgoingMap() {
    let outGoingMap: { [name: string]: string[] } = {}
    for (const [name, vertex] of Object.entries(this.vertices)) {
      for (let from of vertex.incomingNames) {
        if (outGoingMap[from] !== undefined) {
          if (outGoingMap[from].includes(name)) {
            continue
          } else {
            outGoingMap[from].push(name)
          }
        } else if (outGoingMap[from] === undefined) {
          outGoingMap[from] = [name]
        }
      }
    }
    return outGoingMap
  }

  giveRank() {
    if (this.topSorted.length !== this.names.length) this.topologySortCaller()
    this.rank = {} // if not reset to empty, second time calling visit_giveRank wouod cause unexpected result
    this.visit_giveRank()
  }

  delete(deleteName: string) {
    // Delete edge: whoever's has only outgoing and it is deleName
    let outGoingMap = this.getOutgoingMap()
    for (const [vertexName, outgoingList] of Object.entries(outGoingMap)) {
      if (outgoingList.includes(deleteName) && outgoingList.length === 1) {
        this.vertices[vertexName].hasOutgoing = false
      }
    }

    // Delete edge: whoever's 檢查 del 的下家 刪除掉     del 這個 incomming
    for (const [vertexName, vertex] of Object.entries(this.vertices)) {
      this.deleteFromIncomingArr(deleteName, vertex)
      this.deleteFromIncoming(deleteName, vertex)
    }

    // Delete Vertex
    delete this.vertices[deleteName]

    // Delte from names
    this.names = this.names.filter((name) => {
      return name !== deleteName
    })

    // update topSorted and rank
    this.giveRank()
  }

  changeName() {
    //TODO
  }
}
