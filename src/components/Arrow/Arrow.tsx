import React, { useEffect, useContext } from 'react'
import { arrowStyle } from '../../ts/types/app_types'
import { PositionContext } from '../contexts/PositionContext'
import { useDrawConnectorInitial } from '../hooks/useDrawSVGConnector'

export default function Arrow(props: {
  incommingName: string
  name: string
  arrowStyleOpt: arrowStyle
  forwardedRef: React.MutableRefObject<SVGPathElement>
  forwardedDivsRef: React.RefObject<HTMLDivElement>[]
}) {
  const { incommingName, name, arrowStyleOpt, forwardedRef, forwardedDivsRef } = props

  let [positionMap] = useContext(PositionContext)
  let { drawConnectorInitial } = useDrawConnectorInitial(arrowStyleOpt)

  function relatedDivsChecker() {
    const relatedDivs: { from: HTMLDivElement | null; to: HTMLDivElement | null } = { from: null, to: null }
    for (let ref of forwardedDivsRef) {
      const div = ref.current
      if (div?.id === incommingName) relatedDivs.from = div
      if (div?.id === name) relatedDivs.to = div
    }
    // if (typeof relatedDivs.from === null && typeof relatedDivs.to === null) {
    //   throw new Error ("find no related vertex divs in Arrow.tsx")
    // } else {
    //   return relatedDivs
    // }

    /// TODO
    /// 也許要抽出到 utils 寫個 JEST，不然之後只會 改Ａ壞Ｂ 然後找半天
    if (relatedDivs.from === null && relatedDivs.to === null) throw new Error('Cant access divs refs in Arrow.tsx')
    return relatedDivs as { from: HTMLDivElement; to: HTMLDivElement }
  }

  useEffect(() => {
    /** Mount path command on SVGElement */
    let relatedDivs = relatedDivsChecker()
    drawConnectorInitial(relatedDivs, forwardedRef.current)
  }, [forwardedDivsRef])

  return (
    <g fill="none" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)">
      <path
        ref={forwardedRef}
        id={`arrowLeft_${name}_${incommingName}`}
        data-vertex_from={incommingName}
        data-vertex_to={name}
      />
    </g>
  )
}
