import React, { useState } from 'react'
import * as S from './style'

type DeleteVertexProps = {
  deleteVertex: (target: string) => void,
}


function DeleteVertex({ deleteVertex }: DeleteVertexProps) {

  const [target, setTarget] = useState('')

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    deleteVertex(target)
    setTarget('')
  }

  return (
    <S.Form onSubmit={submitHandler}>
      <label> Delete by tag : </label>
      <input 
        name="vertex" 
        value={target} 
        placeholder="👉 a"
        onChange={e => { setTarget(e.target.value) }} />
    </S.Form>
  )
}

export default DeleteVertex
