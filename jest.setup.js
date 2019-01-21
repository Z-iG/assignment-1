import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Setup enzyme's react adapter
configure({ adapter: new Adapter() });


/*import React from "react";
import Enzyme, { shallow, render, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from "enzyme-to-json";
import sinon from "sinon";

//Setting the default serializer for Jest to be from enzyme-to-json
//It easier for a human to read serialized format
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() });

//Make Enzyme functions available in all test files without importing

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;*/



