import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import CssBaseline from '@mui/material/CssBaseline';

import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useEffect, useMemo, useState } from 'react';

import { useThemeUIContext } from './theme/ThemeContext';

import { initReactI18next, useTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';

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
});
import '@fontsource/roboto'; // Defaults to weight 400
import '@fontsource/roboto/400.css'; // Specify weight
import '@fontsource/roboto/400-italic.css'; // Specify weight and style
function App() {
  const content = useRoutes(router);
  const [render, setRender] = useState<boolean>(false);

  const themeUicontext = useThemeUIContext();
  const themeUIProps = useMemo(() => {
    if (!themeUicontext) return null;
    return {
      themeMode: themeUicontext?.themeMode,
      direction: themeUicontext?.direction,
      setDirection: themeUicontext?.setDirection
    };
  }, [themeUicontext]);

  useEffect(() => {
    document.body.setAttribute(
      'dir',
      themeUIProps?.direction === 'rtl' ? 'rtl' : 'ltr'
    );
  }, [themeUIProps?.direction]);

  return (
    <CacheProvider
      value={themeUIProps?.direction === 'rtl' ? cacheRtl : cacheLtr}
    >
      <CssBaseline enableColorScheme={true} />
      {content}
    </CacheProvider>
  );
}
export default App;
