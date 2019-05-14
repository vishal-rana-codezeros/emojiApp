import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Login from './Login';

describe('Login Component render', () => {

  it('login renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
  });
});
