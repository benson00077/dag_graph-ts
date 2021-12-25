import React, { useState, useContext } from 'react'
import { input } from "../../ts/types/app_types";
import * as S from "./styles"

type VertexInputProps = {
  createVertex: ({}: input) => boolean;
}

export default function VertexInput({createVertex}: VertexInputProps) {

  const [vertex, setVertex] = useState('')
  const [incomming, setIncomming] = useState('')
  const [outgoing, setOutgoing] = useState('')

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    const success = createVertex({
      vertex: vertex,
      incomming: incomming,
      outgoing: outgoing
    })
    if (!success) return

    setVertex('')
    setIncomming('')
    setOutgoing('')
  }

  const mouseDownEffect = (e: React.MouseEvent) => {
    const btn = e.currentTarget
    btn.classList.add("btn-mouse-down")
  }

  const mouseUpEffect = (e: React.MouseEvent) => {
    const btn = e.currentTarget
    if (btn.classList.contains("btn-mouse-down")) {
      btn.classList.remove("btn-mouse-down")
    }
  }

  return (
    <>
      <S.Vertex_input>
        <S.Form onSubmit={submitHandler}>
          <label>Incomming Note Tag</label>
          <input name="incomming" placeholder="🡪 a, b, c ..." value={incomming} onChange={e => { setIncomming(e.target.value) }} />

          <label>Tag Name</label>
          <input name="vertex" value={vertex} placeholder="🡪 d (must)" onChange={e => { setVertex(e.target.value) }} />

          <label>Outgoing Note Tag</label>
          <input name="outgoing" value={outgoing} placeholder="🡪 e, f, g ..." onChange={e => { setOutgoing(e.target.value) }} />

          <S.Button onMouseDown={e => mouseDownEffect(e)} onMouseUp={e => mouseUpEffect(e)}>Create !</S.Button>
        </S.Form>
      </S.Vertex_input>
    </>
  )
}