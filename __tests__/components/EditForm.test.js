import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import EditForm from '../../components/EditForm';

describe('<EditForm />', () => {

    let wrapper;

    const fakeItemToEdit = {
        created: "2018-11-15T16:30:00+08:00",
        id: "",
        updated: "2018-11-16T16:30:00+08:00",
        summary: "summary data",
        location: "location data",
        startDateTime: "2019-02-25T16:30:00+08:00",
        endDateTime: "2019-02-25T17:30:00+08:00",
        requestStatus: "",
        label: "Create new todo item",
        newItem: true
    };

    beforeEach(() => {
        const spy = sinon.spy();
        wrapper = shallow(<EditForm itemToEdit={fakeItemToEdit} updateItemToEdit={spy}/>);
    });

    it('includes < label > with "Summary:" text', () => {
        expect(wrapper.find('label').first().text()).toEqual('Summary:');
    });

    it('includes < label > with "Location:" text', () => {
        expect(wrapper.find('label').at(1).text()).toEqual('Location:');
    });

    it('includes < label > with "Start:" text', () => {
        expect(wrapper.find('label').at(2).text()).toEqual('Start:');
    });

    it('includes < label > with "End:" text', () => {
        expect(wrapper.find('label').at(3).text()).toEqual('End:');
    });

    it('includes < label > with "Creation date:" text', () => {
        expect(wrapper.find('label').at(4).text()).toEqual('Creation date:');
    });

    it('includes < label > with "Updated:" text', () => {
        expect(wrapper.find('label').at(5).text()).toEqual('Updated:');
    });

    it('includes < button > with label "Save"', () => {
        expect(wrapper.find('button').text()).toEqual('Save');
    });

});

