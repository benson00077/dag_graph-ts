import React, { useState } from 'react'
import * as S from './style'
import { FaTrash } from "react-icons/fa"

type ResetDagProps = {
  reset: () => void
}

function ResetDag(props: ResetDagProps) {
  const { reset } = props
  const [showTip, setShowTip] = useState(false)

  function mouseDownHandler(e: React.MouseEvent) {
    const icon = e.currentTarget
    icon.classList.add("clicked")
  }
  
  function mouseUpHandler(e: React.MouseEvent) {
    const icon = e.currentTarget
    if (icon.classList.contains("clicked")) {
      icon.classList.remove("clicked")
    }
    reset()
  }


  return (
    <>
      <S.Icon 
        onMouseDown={e => mouseDownHandler(e)}
        onMouseUp={e => mouseUpHandler(e)}
        onMouseEnter={() => setShowTip(true)} 
        onMouseLeave={() => setShowTip(false)}>
        <FaTrash size={2} style={{ height: "45px", width: "45px" }} />
      </S.Icon>
      <S.toolTip show={showTip}>
        <div>
          {showTip
            ? <div>
              We use local storage to keep data between sessions.
              <br /> Click me to delete all storage before creating new graph !
            </div>
            : null
          }
        </div>
      </S.toolTip>
    </>
  )
}


export default ResetDag
