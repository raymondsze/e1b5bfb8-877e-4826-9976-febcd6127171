import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount, shallow, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';
import ScrollTop from '../index';

it('ScrollTop should only render children', () => {
  const location = {
    pathname: 'location',
  };
  const wrapper = mount(
    <ScrollTop location={location}>
      <div>Test Scroll</div>
    </ScrollTop>
  );
  // this should not trigger render
  wrapper.setProps({ location });
  wrapper.setProps({
    location: {
      pathname: 'new-location',
    },
  });
});
