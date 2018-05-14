import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ViralLoops from '../index';
import config from '../config';

const setup = (propOverrides) => {
  const props = Object.assign({
    publicToken: ''
  }, propOverrides);

  const component = shallow(<ViralLoops {...props} />);

  return {
    component,
    props,
    formWidget: component.find({ 'data-test': 'ViralLoops_formWidget' }),
    milestoneWidget: component.find({ 'data-test': 'ViralLoops_milestoneWidget' }),
    counterWidget: component.find({ 'data-test': 'ViralLoops_counterWidget' }),
  }
}

describe('<ViralLoops />', () => {
  // The Viral Loops script requires a page with an existing <script> tag to
  // run without errors.
  document.body.innerHTML = 
    '<script>' +
    '</script>';
  require('./script');

  it('attaches the VL object to window', () => {
    const props = { 
      publicToken: config.viralLoopsKey,
    };
    setup(props);

    const viralLoopsObject = {
      instances: expect.any(Object),
      invoked: expect.any(Boolean),
      load: expect.any(Function),
    }

    expect(window.VL).toMatchObject(viralLoopsObject);
  });

  describe('formWidget', () => {
    const props = {
      publicToken: config.viralLoopsKey,
      formWidget: true,
    }
    const { component } = setup(props);

    it('renders with a form section', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('milestoneWidget', () => {
    const props = {
      publicToken: config.viralLoopsKey,
      milestoneWidget: true,
    }
    const { component } = setup(props);

    it('renders with a rewards section', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('counterWidget', () => {
    const props = {
      publicToken: config.viralLoopsKey,
      counterWidget: true,
    }
    const { component } = setup(props);

    it('renders with a counter section', () => {
      expect(component).toMatchSnapshot();
    });
  });
});