import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';

ReactDOM.render(
  <CssVarsProvider defaultMode="system">
    <App />
  </CssVarsProvider>,
  document.getElementById('root')
);
