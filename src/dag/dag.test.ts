import Dag from "./dagClass"
import Graph from "./graphClass"
import {vertexValue, Vertex} from "./types"

describe.skip("Test Dag class methods", () => {
  let dag = new Dag()

  test("map method", () => {
    dag.map("Benson", "Benson's value")
    expect(dag.vertices['Benson'].value).toEqual("Benson's value")
  })

  test("addEdge method", () => {
    dag.addEdge("Ben", "Benson")
    let benson = dag.vertices['Benson']
    let ben = dag.vertices['Ben']
    expect(benson.incomingNames).toEqual(["Ben"])
    expect(ben.hasOutgoing).toEqual(true)
  })

  test("cycle err", () => {
    expect(() => dag.addEdge("Benson", "Ben")).toThrow()
  })

  test.skip("addEdges method", () => {
    dag.addEdges("Benson", "Benson's value", "Catherine", "Ben")
    let benson = dag.vertices['Benson']
    let catherine = dag.vertices['Catherine']
    expect(benson.incomingNames).toEqual(["Ben"])
    expect(benson.hasOutgoing).toEqual(true)
    expect(catherine.incomingNames).toEqual(["Benson"])
  })

  test("addEdges method with different input type", () => {
    dag.addEdges("Benson", "Benson's value", ["Catherine"], "Ben")
    let benson = dag.vertices['Benson']
    let catherine = dag.vertices['Catherine']
    expect(benson.incomingNames).toEqual(["Ben"])
    expect(benson.hasOutgoing).toEqual(true)
    expect(catherine.incomingNames).toEqual(["Benson"])
  })

  test("topsort method", () => {
    let sortedList: string[] = []
    dag.topsort((vertex, path) => {
      sortedList.push(vertex.name)
    })
    expect(sortedList).toEqual(["Ben", "Benson", "Catherine"])
  })
})


describe("Test Graph class methods", () => {
  let graph = new Graph
  graph.addEdges('Catherine', null, ["David", "George"], ["Alice", "Flora"])
  graph.addEdges('Benson', null, 'David', 'Eva')
  graph.addEdges('Benson', null, 'Catherine', 'Ben')
  graph.addEdge('Alice', 'Catherine')
  graph.addEdge('Benson', 'Alice')

  test("giverank method", () => {
    graph.giveRank()
    expect(graph.topSorted).toEqual([
      'Eva',    'Ben',
      'Benson', 'Alice',
      'Flora',  'Catherine',
      'David',  'George'
    ])
    expect(graph.rank).toEqual({
      George: 0,
      David: 0,
      Catherine: 1,
      Flora: 2,
      Alice: 2,
      Benson: 3,
      Ben: 4,
      Eva: 4
    })
  })

  test("del methods", () => {
    graph.delete("Alice");
  })
})