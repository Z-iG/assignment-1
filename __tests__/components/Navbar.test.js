import React from 'react';
import { shallow } from 'enzyme';

import { createSerializer } from "enzyme-to-json";
import Navbar from '../../components/Navbar';

describe('<Navbar />', () => {

//Setting the default serializer for Jest to be from enzyme-to-json
//It easier for a human to read serialized format
    expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

    it ("renders correctly",() => {
        const wrapper = shallow (
            <Navbar />
        );
        expect(wrapper).toMatchSnapshot();
    });
});
