import React from 'react';
import { shallow, mount } from 'enzyme';

import Login from '../Login';

describe('Login', () => {
  let wrapper;

  it('wraps content in a div with .notificationsFrame class', () => {
    wrapper = shallow(<Login />);
    expect(wrapper.find(this.setState.errors).length).toEqual(1);
    // expect(wrapper.find('errors').length).toEqual(0);
  })
})
