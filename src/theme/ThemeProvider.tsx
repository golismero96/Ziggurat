import { ThemeProvider } from '@mui/system';
import { themeCreator } from './base';
import {
  ThemeContextInterface,
  ThemeUIProvider as ThemeUIContextProvider
} from './ThemeContext';
import React, { FC, useMemo, useState } from 'react';
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

  // const { themeMode, language } = useThemeMode();

  // useEffect(() => {
  //   console.log('themeMode1', theme.palette.mode);
  //   theme.palette.mode = themeMode;
  //   console.log('themeMode2', theme.palette.mode);

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //       },
  //     }),
  //   [mode]
  // );
  //
  // }, [themeMode]);

  return (
    <ThemeUIContextProvider ThemeUIEvents={themeUIEvents}>
      <ThemeProvider theme={themeName}>{props.children}</ThemeProvider>
    </ThemeUIContextProvider>
  );
};
export default ThemeProviderWrapper;
