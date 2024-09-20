import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import {BrowserRouter as Router } from 'react-router-dom'
import {PrivyProvider} from '@privy-io/react-auth';

import App from './App';
import { StateContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="cm0s221k2011vzx3jyla9wsxu"
      config={{
        
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
        
      }}
    >
      <Router>
        <StateContextProvider>
            <App/>
        </StateContextProvider>
      </Router>

    </PrivyProvider>
  </React.StrictMode>,
);