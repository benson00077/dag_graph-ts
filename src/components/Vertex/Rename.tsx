import React, { useContext, useState, useRef, ReactElement } from 'react'
import { DagContext } from '../contexts/DagContext'
import { useClickPreventionOnDoubleClick } from '../hooks/useCancellablePromises'

type RenameProps = {
  initName: string,
  children: ReactElement,
}

function Rename({ initName, children }: RenameProps) {

  const [value, setValue] = useState(initName)
  const [dag, update, setUpdate] = useContext(DagContext)
  const formInputField = useRef<HTMLInputElement>(null)
  const onClick = () => {}
  const onDoubleClick = () => { 
    if (formInputField.current) {
      formInputField.current.focus()
      formInputField.current.setSelectionRange(0, value.length)
    }
  }
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(onClick, onDoubleClick)

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    dag.map(initName, value)
    setUpdate(!update)
    if (formInputField.current) formInputField.current.blur()
  }

  return (
    <div style={{ height: "100%", width: "100%" }} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <form onSubmit={submitHandler}>
        <input ref={formInputField} type="text" value={value} onChange={e => { setValue(e.target.value) }}></input>
      </form>
      {children}
    </div>
  )
}

export default Rename
