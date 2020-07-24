import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';


global.imageurl = 'http://localhost/Laravel/Users/uploads/';
global.apiurl = 'http://localhost/Laravel/Users/';

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();