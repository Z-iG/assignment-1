/**
 * Created by Igor on 12/13/2018.
 */

import Moment from "moment";
import momentLocalizer from 'react-widgets-moment';
import isEmpty from "lodash.isempty";
import findIndex from "lodash.findindex";
import cloneDeep  from "lodash.clonedeep";
import update from 'immutability-helper';


// Add the css styles...
//import '../node_modules/react-widgets/dist/css/react-widgets.css';
//import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import classNames from "classnames";


import EditForm from "./EditForm";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        /*this.handleSubmit = this.handleSubmit.bind(this);*/


        //this.handleChange = this.handleChange.bind(this);

        this.state = {
            items: this.props.items,

            editMode: false,
            requestStatus: "",
            itemToEdit: {
                created: new Date(),
                id: "",
                updated: new Date(),
                summary: "",
                organizerEmail: "",
                status: "",
                startDateTime: new Date(),
                requestStatus: "",
                label: "",
                newItem: false
            }
        }

    }


    /*handleSubmit(e) {

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
            //if(response.ok)
                return response

            } else {
                let error = new Error(response.statusText);
                error.response = response;

                throw error
            }
        }

        function parseJSON(response) {
            return response.json()
        }

        e.preventDefault();
        //const data = e.target;//state.itemsTodit

        const data = this.state.itemToEdit;

        console.log('data');
        console.log(data);


        //updating the state
        this.setState(() => ({
            requestStatus: "requesting"
        }));

            fetch('/api/form-submit-url', {
                method: 'POST',
                body: data
            })
                .then(checkStatus)
                .then(parseJSON)

                .then(function (data) {

                    //updating the state
                    this.setState((prevState) => ({
                        //items: items,
                        requestStatus: 'done'
                    }));

                    console.log('request succeeded with JSON response', data)
                }.bind(this))

                .catch(function (error) {
                    //updating the state
                    this.setState(() => ({
                        requestStatus: "error"
                    }));

                    //console.log('request failed', error)

                }.bind(this))

    }*/

    //handleChange(e){}

    /*setField (e) {
        this.setState({[e.target.name]: e.target.value})
    }*/

    async loadItemDetails(id){
        //updating the state
        this.setState((state) => ({
            requestStatus: 'requesting'
        }));


        try {
            const res = await fetch('/api/v1/to-do-item?id=' + id );
            const json = await res.json();

            console.log(json);

            const index = findIndex(this.state.items, { id: id});

            if (index >= 0) {
                const items = cloneDeep(this.state.items); //create a copy of state

                items[index].itemDetails = json.itemDetails;

                //not good
                //this.setState({ items });

                //updating the state
                this.setState((state) => ({
                    items: items,
                    requestStatus: 'done'
                }));

            }

        } catch (error) {
            //updating the state
            this.setState((state) => ({
                requestStatus: 'error'
            }));
            console.error(error);
        }
    }


    async deleteItem(id){
        //updating the state
        this.setState((state) => ({
            requestStatus: 'requesting'
        }));

        try {
            const res = await fetch('/api/v1/to-do-item/' +id, {
                method: 'DELETE'
            });

            const json = await res.json();

            console.log(json);

            /*const res = await fetch('/api/v1/to-do-item', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: id})
            });

            const json = await res.json();

            console.log(json);*/

            //updating the state
            this.setState((state) => ({
                items: items,
                requestStatus: 'done'
            }));

        } catch (error) {
            //updating the state
            this.setState((state) => ({
                requestStatus: 'error'
            }));
            console.error(error);
        }
    }


    switchToEditMode(id) {
        if (id) {
            const index = findIndex(this.state.items, {id: id});

            if (index >= 0) {
                //const items = cloneDeep(this.state.items); //create a copy of state

                console.log(this.state.items[index].itemDetails);


                //const items = cloneDeep(this.state.items); //create a copy of state

                //const dataToEdit = {}


                const itemToEdit = {
                    created: this.state.items[index].itemDetails.created,
                    id: this.state.items[index].itemDetails.id,
                    updated: this.state.items[index].itemDetails.updated,
                    summary: this.state.items[index].itemDetails.summary,
                    organizerEmail: this.state.items[index].itemDetails.organizer.email,
                    status: this.state.items[index].itemDetails.status,
                    startDateTime: this.state.items[index].itemDetails.start.dateTime,
                    requestStatus: "",
                    label: "Edit todo item",
                    newItem: false
                }


                //updating the state
                //changing show ro edit mode or edit to show mode
                this.setState((state) => ({
                    editMode: !state.editMode,
                    itemToEdit: itemToEdit
                    //itemToEdit: this.state.items[index].itemDetails
                }));
            }
        } else {
            const itemToEdit = {
                created: new Date(),
                id: "",
                updated: new Date(),
                summary: "",
                organizerEmail: "",
                status: "",
                startDateTime: new Date(),
                requestStatus: "",
                label: "Create new todo item",
                newItem: true
            }

            //updating the state
            //changing show ro edit mode or edit to show mode
            this.setState((state) => ({
                editMode: !state.editMode,
                itemToEdit: itemToEdit
            }));

        }

    }

    switchToShowMode(){
        this.setState(() => ({
            editMode: false
        }));
    }

    updateItemToEdit = (e) => {
        console.log({[e.target.name]: e.target.value});

        const newState = update(this.state, {
            itemToEdit: {[e.target.name]: {$set: e.target.value} }
        });

        this.setState(() => (newState));
    }


    /*setRequestStatus = (status) => {
        const newState = update(this.state, {
            itemToEdit: {requestStatus: {$set: status} }
        });

        this.setState(() => (newState));
    }*/

    //update itemToEdit created state when a new moment set via datetime-picker
    /*createdOnChange = date => this.setState({ date });*/


    render(){

        const leftColumnClass = classNames({
            'col-6': this.state.editMode,
            'col': !this.state.editMode
        });

        const rightColumnClass = classNames({
            'col-6': this.state.editMode,
            'd-none': !this.state.editMode
        });

        const items = this.state.items;

        //iterating through the array to create a list of to-do items
        const itemsList = items.map(item => {

            const details = !isEmpty(item.itemDetails);

            return (
                <li className="list-group-item">
                    <span className="badge badge-primary">{Moment(item.itemDate).format('Do MMM YYYY, h:mm:ss a')}</span>
                    <div className="btn" onClick={() => this.loadItemDetails(item.id)}><strong>{item.itemTitle}</strong></div>
                    <button type="button" className="btn btn-danger float-right" onClick={() => this.deleteItem(item.id)}>Delete</button>



                    { details && <div>
                        <div className="m-2">
                            <div>Creation date: {Moment(item.itemDetails.created).format('Do MMM YYYY, h:mm:ss a')}</div>
                            <div>Updated: {Moment(item.itemDetails.updated).format('Do MMM YYYY, h:mm:ss a')}</div>
                            <div>Summary: {item.itemDetails.summary}</div>
                            <div>Organizer email: {item.itemDetails.organizer.email}</div>
                            <div>Status: {item.itemDetails.status}</div>
                            <div>Start: {Moment(item.itemDetails.start.dateTime).format('Do MMM YYYY, h:mm:ss a')}</div>
                        </div>
                        <button type="button" className="btn btn-secondary m-2" onClick={() => this.switchToEditMode(item.id)}>Edit</button>
                    </div>}

                </li>
            )
        });



        const itemToEdit = this.state.itemToEdit;

        /*
        const editForm = (
            <form onSubmit={this.handleSubmit} onChange={this.setField} className="form-inline">
                <div className="form-group m-2">
                    <label htmlFor="created">Creation date:</label>
                    <div className="mx-sm-3">{Moment(itemToEdit.created).format('Do MMM YYYY, h:mm:ss a')}</div>
                </div>

                <div className="form-group m-2">
                    <label htmlFor="updated">Updated:</label>
                    {/!*<input type="text" id="updated" className="form-control mx-sm-3" value={Moment(itemToEdit.updated).format('Do MMM YYYY, h:mm:ss a')} />*!/}
                    <div className="mx-sm-3">{Moment(itemToEdit.updated).format('Do MMM YYYY, h:mm:ss a')}</div>
                </div>

                <div className="form-group m-2">
                    <label htmlFor="updated">Summary:</label>
                    <input type="text" name="itemToEdit.summary" className="form-control mx-sm-3" value={itemToEdit.summary} />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="updated">Organizer email:</label>
                    <input type="text" name="email" className="form-control mx-sm-3" value={itemToEdit.organizerEmail} />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="status">Status:</label>
                    <input type="text" name="status" className="form-control mx-sm-3" placeholder={itemToEdit.status} />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="start">Start:</label>
                    <input type="text" name="start.dateTime" className="form-control mx-sm-3" value={Moment(itemToEdit.startDateTime).format('Do MMM YYYY, h:mm:ss a')} />
                    {/!*<DateTimePicker
                        onChange={}
                        value={itemToEdit.start.dateTime}
                    />*!/}
                </div>

                <button type="submit" className="btn btn-primary m-2">Save</button>

            </form>
        );*/

        momentLocalizer();

        return(
            <div className="container">
                <button type="button" className="btn btn-secondary m-2" onClick={() => this.switchToEditMode(false)}>Create new todo item</button>
                <div className="row">
                    <div className={leftColumnClass}>
                        <ul className="list-group">
                            {itemsList}
                        </ul>
                    </div>

                    <div className={rightColumnClass}>
                       {/* {editForm}*/}

                        {/*<EditForm viewMode={this.switchToShowMode.bind(this)} itemToEdit={itemToEdit} updateItemToEdit={this.updateItemToEdit} setRequestStatus={this.setRequestStatus} />*/}

                        <h2>{itemToEdit.label}</h2>
                        <EditForm viewMode={this.switchToShowMode.bind(this)} itemToEdit={itemToEdit} updateItemToEdit={this.updateItemToEdit} />
                    </div>

                </div>
            </div>
        );
    }
}

export default ToDoList;