/**
 * Created by Igor on 1/11/2019.
 */


import React from 'react';
import { shallow } from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
//const index = require('./index');

import Index from './index';

describe('<Index />', () => {
    it('should be defined', () => {
        expect(Index).toBeDefined()
    });

    let wrapper;

    beforeEach( () => {

        wrapper = shallow(<Index />);
    });


    it('renders 1 < Index/ > component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('renders 1 < Layout/ > component', () => {
        expect(wrapper.find('Layout')).toHaveLength(1);
    });

    it('includes < h1 > with To do list text', () => {
        expect(wrapper.find('h1').text()).toEqual('To do list');
    });

    it('renders 1 < ToDoList/ > component', () => {
        expect(wrapper.find('ToDoList')).toHaveLength(1);
    });

    it('getInitialProps',()=> {
        const initialProps = Index.getInitialProps();
        console.log(initialProps);
    });


});