import React from 'react';
import { MemoryRouter } from 'react-router';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { fromJS } from 'immutable';
import ScrollTop from '../index';

it('ScrollTop should only render children', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <ScrollTop>
        <div>Test Scroll</div>
      </ScrollTop>
    </MemoryRouter>
  );
  expect(toJson(wrapper.find(ScrollTop))).toMatchSnapshot();
});
