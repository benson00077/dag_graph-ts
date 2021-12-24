import { createGlobalStyle, withTheme } from "styled-components";
import { ThemeProps } from "./themes";

type GlobalThemeProps = {
  theme: ThemeProps;
}

const globalStyle = createGlobalStyle`
  :root {
    //dark-mode
    --dark-background: #1A1B27;
    --dark-text: #F5F5F7;
    --dark-button: rgba(0, 0, 0, 0.25);
    --dark-vertexbg: #a371f7;
    --dark-select: rgba(0, 0, 0, 0.25);
    --dark-option: rgba(0, 0, 0, 0.9);

    //light-mode
    --light-background: #E7EAED; //#f2f2f2;
    --light-text: #2E0509;
    --light-button: rgba( 7,  89, 133, 0.35 ); //#007aff;
    --light-vertexbg: #007aff;
    --light-select: rgba( 7,  89, 133, 0.35 );
    --light-option: rgba( 7,  89, 133, 0.9 ); //rgba(255, 255, 255, 0.9);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html body {
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-weight: 500;
    height: 100vh;
    width: 85vw;
    margin: 0 auto;
    background-color: ${( {theme}: GlobalThemeProps) => theme.background};
  }

  .toggler {
    position: absolute;
    right: 1rem;
    top: 1rem;

    h1 {
      font-size: 1.5rem; //3.375rem;
      color: ${( {theme}: GlobalThemeProps ) => theme.text}
    }
  }

  .instructions {
    padding: 1rem 0 1rem 0;
    color: ${( {theme}: GlobalThemeProps ) => theme.text}
  }

  .graph-wrapper {
    position: relative;
    height: 85vh;
    border: solid 1px black;
    border-radius: 15px;

    svg{
      position: absolute;
      height: 100%; // temp
      width: 100%;
    
      marker#arrowhead {
        fill: ${( {theme} ) => theme.text}
      }

      & g {
        stroke: ${( {theme} ) => theme.text}
      }
    }
  }
`
export default withTheme(globalStyle)