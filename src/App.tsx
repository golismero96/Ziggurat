import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import CssBaseline from '@mui/material/CssBaseline';

import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import './i18n';

import {
  getThemeModeFromLocalStorage,
  setAttributesLinkStyle,
  useThemeMode
} from './theme/ThemeContext';

const isBrowser = typeof document !== 'undefined';
let insertionPoint;

if (isBrowser) {
  const emotionInsertionPoint = document.querySelector(
    'meta[name="emotion-insertion-point"]'
  );
  insertionPoint = emotionInsertionPoint ?? undefined;
}

// Create rtl cache
const cacheRtl = createCache({
  key: 'mui-style-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
  insertionPoint
});

const cacheLtr = createCache({
  key: 'mui-style-ltr',
  insertionPoint
}); // Defaults to weight 400

function App() {
  const content = useRoutes(router);

  const { language, setThemeMode, toggleFontFamily } = useThemeMode();

  useEffect(() => {
    setAttributesLinkStyle();
    toggleFontFamily();
  }, [language]);

  useEffect(() => {
    setThemeMode(getThemeModeFromLocalStorage());
  }, []);

  return (
    <CacheProvider value={language === 'fa' ? cacheRtl : cacheLtr}>
      <CssBaseline enableColorScheme={true} />
      {content}
    </CacheProvider>
  );
}
export default App;
