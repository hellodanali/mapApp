import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';
import Header from './components/Header';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={Header} />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
