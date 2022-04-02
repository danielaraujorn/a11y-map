import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@mui/styles';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { Navigation } from './Navigation';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { theme } from './theme';
import ptMessages from './lang/pt.json';
import { SnackbarProvider } from 'notistack';

const locale = navigator.language;
const messages: { [key: string]: { [key: string]: string } } = {
  'pt-BR': ptMessages,
};

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messages[locale] || ptMessages}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <Navigation />
            </SnackbarProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
