import React, {
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';
import { Direction } from '@mui/system';
import { PaletteMode } from '@mui/material';
import { isEqual, isFunction } from 'lodash';

export interface ThemeContextInterface {
  themeMode: PaletteMode;
  setThemeMode: (nextThemeMode: SetStateAction<PaletteMode>) => void;
  toggleMode: (mode: PaletteMode) => void;
  direction: Direction;
  setDirection: (nextDirection: SetStateAction<Direction>) => void;
  toggleDirection: (mode: PaletteMode) => void;
}

interface ThemeUiContextInterface {
  ThemeUIEvents?: ThemeContextInterface;
  children: React.ReactNode;
}
const ThemeUIContext = createContext<ThemeContextInterface | null>(null);
const ThemeUIConsumer = ThemeUIContext.Consumer;

function useThemeUIContext() {
  return useContext<ThemeContextInterface | null>(ThemeUIContext);
}
const ThemeUIProvider: React.FC<ThemeUiContextInterface> = ({
  ThemeUIEvents,
  children
}) => {
  const [themeMode, setThemeModeBase] = useState<PaletteMode>('light');
  const [direction, setDirectionBase] = useState<Direction>('rtl');

  const setThemeMode = useCallback((nextThemeMode: SetStateAction<any>) => {
    setThemeModeBase((prevThemeMode: PaletteMode) => {
      if (isFunction(nextThemeMode)) {
        nextThemeMode = nextThemeMode(prevThemeMode);
      }

      if (isEqual(nextThemeMode, prevThemeMode)) {
        return prevThemeMode;
      }

      return nextThemeMode;
    });
  }, []);

  const setDirection = useCallback((nextDirection: SetStateAction<any>) => {
    setDirectionBase((prevDirection: Direction) => {
      if (isFunction(nextDirection)) {
        nextDirection = nextDirection(prevDirection);
      }

      if (isEqual(nextDirection, prevDirection)) {
        return prevDirection;
      }

      return nextDirection;
    });
  }, []);

  const value: ThemeContextInterface = {
    direction: direction,
    setDirection: setDirection,
    toggleMode: ThemeUIEvents.toggleMode,
    themeMode: themeMode,
    setThemeMode: setThemeMode,
    toggleDirection: ThemeUIEvents.toggleDirection
  };
  return (
    <ThemeUIContext.Provider value={value}>{children}</ThemeUIContext.Provider>
  );
};
export { ThemeUIProvider, ThemeUIConsumer, useThemeUIContext };
