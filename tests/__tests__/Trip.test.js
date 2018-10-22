import React from 'react';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Trip from '../../client/src/components/Trip.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Trip', () => {
  it('should be defined', () => {
    expect(Trip).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(
      <Trip />
    );
    expect(tree).toMatchSnapshot();
  });

});