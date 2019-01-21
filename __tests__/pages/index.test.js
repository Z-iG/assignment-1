import React from 'react';
import { shallow } from 'enzyme';
//import {shallowToJson} from 'enzyme-to-json';

import { createSerializer } from "enzyme-to-json";
import Index from '../../pages/index';

describe('<Index />', () => {

    //jest.mock('../../services/requestInitialProps');


//Setting the default serializer for Jest to be from enzyme-to-json
//It easier for a human to read serialized format
    expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

    it ("renders correctly",() => {

     const wrapper = shallow (
        <Index />
     );

     expect(wrapper).toMatchSnapshot();

     });







    /*let wrapper;

    beforeEach( () => {

        wrapper = shallow(<Index />);
    });


    it('should be defined', () => {
        expect(Index).toBeDefined()
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
    });*/

    /*it('fetches todo items from assignment-1 API and pass them as props', done => {
        //const wrapper = shallow (<Index/>);

        setTimeout(() => {
            wrapper.update();


            const initialProps = Index.getInitialProps();
                 console.log(initialProps);


            //const instance = wrapper.instance()



            //console.log(instance.props.items);


            //console.log(props)

            //expect( props.items.length).toEqual(2);


            //expect(wrapper.find('ToDoList').length).toEqual(1);




            done();
        })

    })*/



    // it('getInitialProps',()=> {
    //     const initialProps = Index.getInitialProps();
    //     console.log(initialProps);
    // });


});