import { Direction, ThemeProvider } from '@mui/system';
import { themeCreator } from './base';
import {
  ThemeContextInterface,
  ThemeUIProvider as ThemeUIContextProvider
} from './ThemeContext';
import { PaletteMode } from '@mui/material';
import { FC } from 'react';

const ThemeProviderWrapper: FC<any> = (props) => {
  const MainTheme = themeCreator('PureLightTheme');

  const themeUIEvents: ThemeContextInterface = {
    themeMode: 'light',
    setThemeMode: (mode: PaletteMode) => {},
    toggleMode: (mode: PaletteMode) => {},
    direction: 'rtl',
    setDirection: (direction: Direction) => {},
    toggleDirection: (direction) => {}
  };

  return (
    <ThemeUIContextProvider ThemeUIEvents={themeUIEvents}>
      <ThemeProvider theme={MainTheme}>{props.children}</ThemeProvider>
    </ThemeUIContextProvider>
  );
};
export default ThemeProviderWrapper;
