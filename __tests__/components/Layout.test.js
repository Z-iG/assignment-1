import React from 'react';
import { shallow } from 'enzyme';

import { createSerializer } from "enzyme-to-json";
import Layout from '../../components/Layout';

describe('<Layout />', () => {

//Setting the default serializer for Jest to be from enzyme-to-json
//It easier for a human to read serialized format
    expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

    it ("renders correctly",() => {
        const wrapper = shallow (
            <Layout />
        );
        expect(wrapper).toMatchSnapshot();
    });
});
