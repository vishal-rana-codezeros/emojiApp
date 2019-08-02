import React from 'react';
import ReactDOM from 'react-dom';
import Keyboards from './Keyboards';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.unmountComponentAtNode(div);
});