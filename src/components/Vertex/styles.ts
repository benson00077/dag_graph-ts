import styled from "styled-components";

interface IPosn {
  posn: {
    position: string,
    top: string,
    left: string,
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
  */
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`