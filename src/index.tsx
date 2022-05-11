import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@mui/styles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import ptMessages from './lang/pt.json';
import reportWebVitals from './reportWebVitals';
import { GeolocationProvider } from './contexts/GeolocationContext';
import { Navigation } from './Navigation';
import { theme } from './theme';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ConfirmationProvider } from './contexts/ConfirmationContext';

const locale = navigator.language;
const messages: { [key: string]: { [key: string]: string } } = {
  'pt-BR': ptMessages,
};

ReactDOM.render(
  <React.StrictMode>
    <GeolocationProvider>
      <IntlProvider locale={locale} messages={messages[locale] || ptMessages}>
        <AuthProvider>
          <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <SnackbarProvider>
                  <Router>
                    <ConfirmationProvider>
                      <Navigation />
                    </ConfirmationProvider>
                  </Router>
                </SnackbarProvider>
              </ThemeProvider>
            </MuiThemeProvider>
          </StylesProvider>
        </AuthProvider>
      </IntlProvider>
    </GeolocationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
