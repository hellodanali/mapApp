import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import CitySearch from './components/CitySearch';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={CitySearch} />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
