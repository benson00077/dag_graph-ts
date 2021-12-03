import Dag from './dagClass'
import { IdagData, Vertex } from './types'


export default class Graph extends Dag implements IdagData {
  rank: {
    [name: string] : number
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
      let nextName = leafToRoot[i+1]
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

  giveRank() {
    if (this.topSorted.length !== this.names.length) this.topologySortCaller()
    this.rank = {} // if not reset to empty, second time calling visit_giveRank wouod cause unexpected result
    this.visit_giveRank()
  }

  delete(name: string) {
    //TODO
  }

  changeName() {
    //TODO
  }

  
}