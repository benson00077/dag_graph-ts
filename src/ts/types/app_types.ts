export type input = {
  vertex: string
  incomming: string
  outgoing: string
}

export type dagEdagesInput = {
  incomming: string | string[]
  vertex: string
  outgoing: string | string[]
}

export type RefsDiv = React.RefObject<HTMLDivElement>[] // {current: [..., {current: Ele} ]}
export type RefsArrows = React.RefObject<SVGPathElement>[]

export type arrowStyle = 'CURVE' | 'STRAIGHT'
