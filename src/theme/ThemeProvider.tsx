import { FC, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import {
  ThemeContextInterface,
  ThemeUIProvider as ThemeUIContextProvider,
  getLanguage
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
    toggleFontFamily: () => {
      const changeFont = 'yekan';

      // رشته فونت اصلی
      const originalFontString = themeName?.typography?.fontFamily;

      // اگر فونت وجود داشت، آن حذف میشود. در غیر این صورت، آن اضافه میشود.
      const newFontString =
        getLanguage() === 'en'
          ? originalFontString.replace(new RegExp(changeFont + ',', 'g'), '')
          : changeFont + ',' + originalFontString;

      console.log('newFontString1', newFontString);
      setThemeName({
        ...themeName,
        typography: {
          ...themeName.typography,
          fontFamily: newFontString
        }
      });
    }
  };

  console.log('newFontString', themeName);
  return (
    <ThemeUIContextProvider ThemeUIEvents={themeUIEvents}>
      <ThemeProvider theme={themeName}>{props.children}</ThemeProvider>
    </ThemeUIContextProvider>
  );
};
export default ThemeProviderWrapper;
