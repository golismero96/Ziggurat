import { FC, useState } from 'react';
import { ThemeProvider } from '@mui/system';
import { themeCreator } from './base';
import {
  ThemeContextInterface,
  ThemeUIProvider as ThemeUIContextProvider
} from './ThemeContext';
import { PaletteMode } from '@mui/material';

const ThemeProviderWrapper: FC<any> = (props) => {
  // const MainTheme = themeCreator('PureLightTheme');

  const [themeName, _setThemeName] = useState(themeCreator('PureLightTheme'));

  const themeUIEvents: ThemeContextInterface = {
    toggleMode: (mode: PaletteMode) => {
      _setThemeName({
        ...themeName,
        palette: {
          ...themeName.palette,
          mode: mode
        }
      });
    }
  };

  return (
    <ThemeUIContextProvider ThemeUIEvents={themeUIEvents}>
      <ThemeProvider theme={themeName}>{props.children}</ThemeProvider>
    </ThemeUIContextProvider>
  );
};
export default ThemeProviderWrapper;
