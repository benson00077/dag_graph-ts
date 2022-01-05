import TogglerButton from './components/TogglerButton/ToggleButton';
import GlobalStyle from './components/styles/global'
import ThemeContext from './components/contexts/ThemeContext';
import { useThemeMode } from './components/hooks/useThemeMode';

import { PositionContextProvider } from "./components/contexts/PositionContext";
import { DagContextProvider } from "./components/contexts/DagContext";

import GraphMiddleWare from './components/GraphMiddleWare';
import { useDagStorage } from './components/hooks/useDagStorage';

function App() {

  const { theme, themeToggler } = useThemeMode();
  const { dagStorage, setlocalStorage } = useDagStorage();

  return (
    <ThemeContext theme={theme}>

      <GlobalStyle />
      <div className="toggler">
        <TogglerButton themeToggler={themeToggler} />
        <div>
          <h1>{theme}</h1>
        </div>
      </div>

      <DagContextProvider setlocalStorage={setlocalStorage}>
        <PositionContextProvider>
          <GraphMiddleWare />
        </PositionContextProvider>
      </DagContextProvider>

    </ThemeContext>
  );
}

export default App;
