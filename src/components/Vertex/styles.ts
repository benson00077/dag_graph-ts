import styled from "styled-components";

interface IPosn {
  posn: {
    position: string,
    top?: string,
    left?: string,
  }
}

export const Container = styled.div<IPosn>`
  color: ${( {theme}) => theme.text};
  background-color:${( {theme}) => theme.vertexbg};
  text-align: center;
  padding: 10px;
  min-width: 100px;
  height: auto;
  border-radius: 15px;

  position: absolute;
  top: ${( {posn} ) => posn.top};
  left: ${( {posn} ) => posn.left};


  /*
      To Prevent user selectin inside the drag source 
      This is also covered in draggable component (duplicated)
  */
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  /*
      vertex's name as key 
  */
  span {
    background-color: rgba(14, 151, 179, 0.13);
    padding: 0 5% 0 5%;
    position: absolute;
    top: 3%;
    left: 4px;
    border: 1px solid rgba(16, 18, 27, 0.35);
    border-radius: 15px;
  }

  /*
      vertex's value could changed by submitting form
  */
  form input{
    color: ${( {theme}) => theme.text};
    background-color:${( {theme}) => theme.vertexbg};
    border: 0;
    border-radius: 15px;
    outline: 0;
    cursor: default;
    max-width: 80px;
    font-size: 1.08rem;
    text-align: center;

    &:focus{
      background-color: rgb(156 163 175);
    }
  }
`
