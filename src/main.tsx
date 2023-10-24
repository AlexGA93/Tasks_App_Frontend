import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './sass/main.scss';
import { Provider } from 'react-redux';
import { reduxStore } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
    
  
)
