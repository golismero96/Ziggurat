import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './theme/ThemeProvider';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </LocalizationProvider>
);

serviceWorker.unregister();
reportWebVitals();
