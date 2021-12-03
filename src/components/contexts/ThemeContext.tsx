// https://dev.to/viniciusmdias/how-to-create-a-theme-in-react-typescript-with-styled-components-3fn

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/themes';

type ThemeContextProps = {
  theme: string,
  children: React.ReactNode
}

const ThemeContext = ({ theme, children }: ThemeContextProps) => {

  const themeMode = theme === 'dark' ? darkTheme : lightTheme;

  return <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
};

export default ThemeContext