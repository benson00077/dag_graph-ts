//TODO
// import React from "react";
// import ReactDom, { findDOMNode, unmountComponentAtNode } from "react-dom";
// import TestUtils from "react-dom/test-utils";
// import { ShallowRenderer } from "react-dom/test-utils"; //
// import Draggable from "./Draggable";

describe.skip("draggable", () => {
  let drag: any = null;

  // Remove body margin so offsetParent calculations work preperly
  beforeAll(() => {
    const styleNode = document.createElement("style");
    // browser detection (based on prototype.js)
    const styleText = document.createTextNode("body {margin: 0;");
    styleNode.appendChild(styleText);
    document.getElementsByName("head")[0].appendChild(styleNode);
  });

  beforeEach(() => {
    jest.spyOn(console, "error");
  });

  // afterEach(() => {
  //   try {
  //     TestUtils.Simulate.mouseUp(findDOMNode(drag as Element)); //reset user-select;
  //     unmountComponentAtNode(findDOMNode(drag).parentNode);
  //   } catch (e) {
  //     return;
  //   }
  // });


  describe('props', () => { 
    it ('should have default properties', () => {
      //drag = TestUtils.renderIntoDocument(<Draggable><div></div></Draggable>)
    })
  })
});
