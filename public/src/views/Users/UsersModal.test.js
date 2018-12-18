import React from 'react';
import ReactDOM from 'react-dom';
import UsersModal from './UsersModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersModal/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
