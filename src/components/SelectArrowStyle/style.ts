import styled from "styled-components";

const dropDownHeight = '4'
const optionsHeight = '10'
const unit = 'rem'

export const Dropdown = styled.div`
  color: ${( {theme}) => theme.text};
  border: solid;
  border-radius: 5px;
  height: ${dropDownHeight + unit};
  width: 8rem;
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  /* glassmorphism */
  background: ${( {theme} ) => theme.select};
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );

  &:hover {
    cursor: pointer;
  }

  p {
    padding: 1.3rem;
  }

  .options {
    position: absolute;
    top: -${optionsHeight + unit};
    height: ${optionsHeight + unit};
    width: 25vw;

    display: flex;
    flex-direction: row;
    justify-content: center;
    
    div {
      background-color: ${( {theme} ) => theme.option};
      /* glassmorphism */
      box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
      backdrop-filter: blur( 4px );
      border-radius: 10px;
      border: 1px solid rgba( 255, 255, 255, 0.18 );
      margin: 0.5rem;

      /* TODO: svg path not align with viewpoint */
      width: 135px;
      height: 144px;


      svg {
        marker#arrowhead {
          fill: ${( {theme} ) => theme.text}
        }
        
        & g {
          stroke: ${( {theme} ) => theme.text}
        }
      }
    }
  }
  
  .collapseAria {
    opacity: 0;
    transition: all 0.3s smooth;
  }
  
  .expandAria {
    opacity: 1;
  }
`