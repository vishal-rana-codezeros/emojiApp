import React from 'react';
import {shallow} from 'enzyme/build';
import {userModal} from './UsersModal'


it('mounts without crashing', () => {
  const wrapper = shallow(<userModal />);
  wrapper.unmount()
});