import React, { useState } from 'react'
import Graph from "../dag/graphClass"

type DeleteVertexProps = {
  deleteVertex: (target: string) => void,
}


function DeleteVertex({ deleteVertex }: DeleteVertexProps) {

  const [target, setTarget] = useState('')

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    deleteVertex(target)
    setTarget("")
  }

  return (
    <form onSubmit={submitHandler}>
      <input name="vertex" value={target} onChange={e => { setTarget(e.target.value) }} />
    </form>
  )
}

export default DeleteVertex
