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
    --dark-button: #eee3c1ff;
    --dark-vertexbg: #a371f7;

    //light-mode
    --light-background: #E7EAED; //#f2f2f2;
    --light-text: #2E0509;
    --light-button: #007aff;
    --light-vertexbg: #007aff;
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
    width: 50vw;
    margin: 0 auto;
    background-color: ${( {theme}: GlobalThemeProps) => theme.background};
  }

  h1 {
    font-size: 3.375rem;
    color: ${( {theme}: GlobalThemeProps ) => theme.text}
  }
`

export default withTheme(globalStyle)