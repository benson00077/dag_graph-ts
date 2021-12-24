import React, { useState } from 'react'
import { arrowStyle } from './ts/types/app_types'

type selectArrowStyleProps = {
  styleOpt: arrowStyle
  setStyleOpt: React.Dispatch<React.SetStateAction<arrowStyle>>
}


function SelectArrowStyle({styleOpt, setStyleOpt}: selectArrowStyleProps) {
  
  function selectStyle(e: React.ChangeEvent<HTMLSelectElement>) {
    setStyleOpt(e.target.value as arrowStyle)
  }

  return (
    <>
      <label htmlFor="arrowStyle"> Choose arrow style </label>
      <select id="arrowStyle" onChange={e => selectStyle(e)} value={styleOpt}>

        <option value={'CURVE'}>Curve</option>
        <option value={'STRAIGHT'}>Straight</option>
      </select>
    </>
  )
}

export default SelectArrowStyle
