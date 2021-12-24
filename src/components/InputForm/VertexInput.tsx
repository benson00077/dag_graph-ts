import React, { useState, useContext } from 'react'
import { input } from "../../ts/types/app_types";
import * as S from "./styles"

type VertexInputProps = {
  createVertex: ({}: input) => void;
}

export default function VertexInput({createVertex}: VertexInputProps) {

  const [vertex, setVertex] = useState('')
  const [incomming, setIncomming] = useState('')
  const [outgoing, setOutgoing] = useState('')

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    if (!vertex) { alert(`Vertex Name must not be empty`) }
    
    createVertex({
      vertex: vertex,
      incomming: incomming,
      outgoing: outgoing
    })

    setVertex('')
    setIncomming('')
    setOutgoing('')
  }

  return (
    <>
      <S.Vertex_input>
        <S.Form onSubmit={submitHandler}>
          <label>Incomming Vertex</label>
          <input name="incomming" placeholder="Ex: a, b, c ..." value={incomming} onChange={e => { setIncomming(e.target.value) }} />

          <label>Vertex Name</label>
          <input name="vertex" value={vertex} onChange={e => { setVertex(e.target.value) }} />

          <label>Outgoing Vertex</label>
          <input name="outgoing" value={outgoing} placeholder="Ex: d, e ,f..." onChange={e => { setOutgoing(e.target.value) }} />

          <S.Button>Create !</S.Button>
        </S.Form>
      </S.Vertex_input>
    </>
  )
}