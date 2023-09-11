import { FC, useState } from 'react';
import { ThemeProvider } from '@mui/system';
import { themeCreator } from './base';
import {
  ThemeContextInterface,
  ThemeUIProvider as ThemeUIContextProvider
} from './ThemeContext';
import { PaletteMode } from '@mui/material';

const ThemeProviderWrapper: FC<any> = (props) => {
  const [themeName, setThemeName] = useState(themeCreator('PureLightTheme'));

  const themeUIEvents: ThemeContextInterface = {
    toggleMode: (mode: PaletteMode) => {
      setThemeName({
        ...themeName,
        palette: {
          ...themeName.palette,
          mode: mode
        }
      });
    },
    toggleFontFamily: (changeFont: string) => {
      let fontFamily = '';
      console.log('test', changeFont);
      if (themeName.typography.fontFamily.includes(changeFont)) {
        console.log('test1', fontFamily);
        fontFamily = `${changeFont},${themeName.typography.fontFamily}`;
        console.log('test2', fontFamily);
      } else {
        console.log('test3', fontFamily);
        fontFamily = themeName.typography.fontFamily.replace(
          `${changeFont},`,
          ''
        );
        console.log('test4', fontFamily);
      }
      setThemeName({
        ...themeName,
        typography: {
          ...themeName.typography,
          fontFamily: fontFamily
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
