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

      &:hover {
        transform: translate(-0.2rem, -0.2rem);
      }

      &.option-mouse-down {
        transform: scale(0.95);
      }

      /* TODO: svg path not align with viewpoint */
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
    transform: translateX(-2rem);
    width: 0;
    opacity: 0;
    transition-property: width, opacity, transform;
    transition-duration: 0.5s, 0.5s, 0.5s;
    transition-timing-function: linear, ease-out, linear;
  }
  
  .expandAria {
    transform: translateX(0);
    width: 25vw;
    opacity: 1;
    transition-property: width, opacity, transform;
    transition-duration: 0.5s, 1s, 0.5s;
    transition-timing-function: linear, ease-in, linear;
  }
`