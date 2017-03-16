import React from 'react';
import ReactDOM from 'react-dom';

// import global styles
import './styles/index.scss';

import App from './app';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );
};

render(App);
