import React, { useState, useRef } from 'react'
import { arrowStyle } from '../../ts/types/app_types'
import * as S from './style'

type selectArrowStyleProps = {
  styleOpt: arrowStyle
  setStyleOpt: React.Dispatch<React.SetStateAction<arrowStyle>>
}

function SelectArrowStyle({ styleOpt, setStyleOpt }: selectArrowStyleProps) {
  //TODO: svg path not alignt with window viewpoint
  const [showOptions, setShowOptions] = useState(false)

  const mouseDownEffect = (e: React.MouseEvent) => {
    const option = e.currentTarget
    option.classList.add('option-mouse-down')
  }

  const mouseUpEffect = (e: React.MouseEvent) => {
    const option = e.currentTarget
    if (option.classList.contains('option-mouse-down')) {
      option.classList.remove('option-mouse-down')
    }
  }

  return (
    <>
      <S.Dropdown onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)}>
        <p> Arrow style </p>
        <div className={`options ${showOptions ? 'expandAria' : 'collapseAria'}`} data-aria-expend={showOptions}>
          <div
            onClick={() => setStyleOpt('CURVE')}
            onMouseDown={(e) => mouseDownEffect(e)}
            onMouseUp={(e) => mouseUpEffect(e)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <marker
                  id="arrowhead"
                  viewBox="0 0 10 10"
                  refX="3"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
              </defs>
              <g fill="none" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)">
                <path d="M80,20 C15,20 15,120 80,120" />
              </g>
            </svg>
          </div>
          <div
            onClick={() => setStyleOpt('STRAIGHT')}
            onMouseDown={(e) => mouseDownEffect(e)}
            onMouseUp={(e) => mouseUpEffect(e)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <marker
                  id="arrowhead"
                  viewBox="0 0 10 10"
                  refX="3"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
              </defs>
              <g fill="none" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)">
                <path d="M65,20 65,115" />
              </g>
            </svg>
          </div>
        </div>
      </S.Dropdown>
    </>
  )
}

export default SelectArrowStyle
