import React from "react";
import Info from "./info";
import {instanceOf} from 'prop-types';

const componentDidMountSpy = jest.spyOn(Info.prototype, "componentDidMount");
const componentDidUpdateSpy = jest.spyOn(Info.prototype, "componentDidUpdate");
const componentWillUnmountSpy = jest.spyOn(
  Info.prototype,
  "componentWillUnmount"
);

const setUp = () => shallow(<Info />);
const setUpMount = () => mount(<Info />);

describe("Info component", () => {
  let component;
  beforeEach(() => {
    jest.spyOn(window, "addEventListener");
    jest.spyOn(window, "removeEventListener");
    component = setUp();
  });

  afterEach(() => {
    window.addEventListener.mockRestore();
    window.removeEventListener.mockRestore();
  });

  it("should render Info component", () => {
    expect(component).toMatchSnapshot();
  });

  describe("Lifecycle methods", () => {
    it("should call componentDidMount once", () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    });

    it("should not call componentWillUnmount when component just mounted", () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(0);
    });

    it("should call componentDidUpdate", () => {
      component.setProps();
      component.setProps();
      component.setProps();
      component.setProps();
      component.setProps();
      component.setProps();
      expect(componentDidUpdateSpy).toHaveBeenCalled();
      expect(componentDidUpdateSpy).toHaveBeenCalledTimes(6);
      component.setProps();
      component.setProps();
      component.setState({});
      component.setState({});
      expect(componentDidUpdateSpy).toHaveBeenCalledTimes(10);
    });

    it("should call componentWillUnmount", () => {
      component.unmount();
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Component handlers", () => {
    it("should call addEventListener when component mounted", () => {
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
    });

    it("should call handleChangeTitle in componentDidUpdate", () => {
      const instance = setUp().instance();
      instance.handleChangeTitle = jest.fn();
      instance.componentDidUpdate();
      instance.componentDidUpdate();
      instance.componentDidUpdate();
      expect(instance.handleChangeTitle).toHaveBeenCalledTimes(3);
    });

    it("should call removeEventListener when component unmounted", () => {
      component.unmount();
      expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    });

    it("should call handleWidth during window resize", () => {
      expect(component.state().width).toBe(0);
      global.dispatchEvent(new Event("resize"));
      expect(component.state().width).toBe(window.innerWidth);
    });
  });

  describe("Component handlers", () => {
    it('should work onChange input', function() {
      // let wrapped = shallow(<Info />);
      // wrapped.find("input").simulate('change', {target: {value: 'some'}})
      // expect(wrapped.find("input").get(0).props.value).toEqual("something");

      // let wrapped = shallow(<Info />);
      // const input = wrapped.find("input")
      // input.simulate('change', {target: {value: 'some'}})
      // expect(input.get(0).props.value).toEqual("something111");
      // expect(wrapped.find("input").get(0).props.value).toEqual("something111");

      // component = setUpMount()
      // const instance = setUpMount().instance();
      const input = component.find('input').at(0)
      const input2 = component.find('input').at(1)
      input.simulate('change', {target: {value: 'input1 some'}})
      input2.simulate('change', {target: {value: 'input222 some'}})
      expect(component.find('input').get(0).props.value).toEqual('input1 some')
      expect(component.find('input').get(1).props.value).toEqual('input222 some')
      expect(component.state().inputValue).toEqual('input1 some')
      expect(component.state().inputValue2).toEqual('input222 some')
    });
  })
});
