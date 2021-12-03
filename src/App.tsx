import TogglerButton from './components/TogglerButton/ToggleButton';
import GlobalStyle from './components/styles/global'
import ThemeContext from './components/contexts/ThemeContext';
import { useThemeMode } from './components/hooks/useThemeMode';

import GraphMiddleWare from './components/GraphMiddleWare';

function App() {
  const { theme, themeToggler } = useThemeMode();

  return (
    <ThemeContext theme={theme}>
      <GlobalStyle />
      <header>
        <TogglerButton themeToggler={themeToggler} />
      </header>
      <h1>{theme}</h1>
      <GraphMiddleWare />
    </ThemeContext>
  );
}

export default App;
