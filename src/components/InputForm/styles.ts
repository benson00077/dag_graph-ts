import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Button = styled.button`
  background-color: ${({ theme }) => theme.button}; //#337ab7;
  border-color: #2e6da4;
  color: #fff;
`

export const Vertex_input = styled.div`
  position: fixed;
  right: 100px;
  bottom: 50px;
`