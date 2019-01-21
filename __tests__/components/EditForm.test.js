import EditForm from '../../components/EditForm';
import { shallow, render, mount } from 'enzyme';
import sinon from "sinon";


it ("calls updateItemToEdit on submit",() => {

    const spy = sinon.spy();

    const wrapper = mount (
        < EditForm itemToEdit={ {"created": "2019-01-18T07:01:52.449Z"} } updateItemToEdit={ spy }/>
    );

    wrapper.find("div").first().simulate("submit");


    expect(spy.calledOnce).toBe(true);

});