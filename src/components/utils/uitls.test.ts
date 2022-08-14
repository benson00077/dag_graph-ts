import inputParser from './inputParser'
import { input } from '../../ts/types/app_types'
import Graph from '../../dag/graphClass'
import arrowsInfoGetter from './arrowsInfoGetter'

describe.skip('Test inputParser', () => {
  describe('when untrimmed input', () => {
    it('should recognize space and comma as delimter and have trimmed output', () => {
      let output = inputParser({
        incomming: '  a, b,   c ',
        vertex: 'd',
        outgoing: 'e f   g    ',
      })
      expect(output).toEqual({
        incomming: ['a', 'b', 'c'],
        vertex: 'd',
        outgoing: ['e', 'f', 'g'],
      })
    })
  })
})

describe.skip('Test arrwosInfoGetter', () => {
  let dag = new Graph()
  dag.addEdges('d', null, ['e', 'f', 'g'], ['a', 'b', 'c'])
  dag.giveRank()

  describe('when ', () => {
    it('should ', () => {
      //console.log(dag.topSorted)
      let [arrowsMap, arrowsNumber] = arrowsInfoGetter(dag)
      console.log(arrowsMap)
    })
  })
})
