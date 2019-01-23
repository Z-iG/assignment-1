import Moment from "moment";
import momentLocalizer from 'react-widgets-moment';
import isEmpty from "lodash.isempty";
import findIndex from "lodash.findindex";
import cloneDeep  from "lodash.clonedeep";
import update from 'immutability-helper';
import classNames from "classnames";
import PropTypes from "prop-types";
import fetch from 'isomorphic-fetch';
import EditForm from "./EditForm";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,

            editMode: false,
            requestStatus: this.props.requestStatus,
            itemToEdit: {
                created: "",
                id: "",
                updated: "",
                summary: "",
                location: "",
                startDateTime: "",
                endDateTime: "",
                requestStatus: "",
                label: "",
                newItem: false
            }
        }

    }

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id:PropTypes.string,
            itemTitle:PropTypes.string,
            itemDate:PropTypes.string,
            itemDetails:PropTypes.object
        }))
    };

    async loadItemDetails(id){
        //updating the state with ajax request status
        this.setState((state) => ({
            requestStatus: 'requesting'
        }));


        try {
            const res = await fetch('/api/v1/to-do-item?id=' + id );
            const json = await res.json();
            const status = await res.status;


            if (res.ok){
                const index = findIndex(this.state.items, { id: id});

                if (index >= 0) {
                    const items = cloneDeep(this.state.items); //create a copy of state

                    items[index].itemDetails = json.itemDetails;

                    //updating the state with ajax request status
                    this.setState((state) => ({
                        items: items,
                        requestStatus: 'done'
                    }));
                }
            } else {
                //updating the state with ajax request status
                this.setState((state) => ({
                    requestStatus: 'error'
                }));

                alert ("There was an error contacting Google Calendar service: : Error " + status + " , "  + json.errorMessage);
            }

        } catch (error) {
            //updating the state with ajax request status
            this.setState((state) => ({
                requestStatus: 'error'
            }));

            //console.error(error);
        }
    }


    async deleteItem(id){
        //updating the state with ajax request status
        this.setState((state) => ({
            requestStatus: 'requesting'
        }));

        try {
            const res = await fetch('/api/v1/to-do-item/' + id, {
                method: 'DELETE'
            });

            const json = await res.json();
            const status = await res.status;

            if (status.ok){

                const index = findIndex(this.state.items, { id: id});

                if (index >= 0) {
                    let items = cloneDeep(this.state.items); //create a copy of state
                    items.splice(index, 1);

                    //updating the state with ajax request status
                    this.setState((state) => ({
                        items: items,
                        requestStatus: 'done'
                    }));
                }

            } else {
                //updating the state with ajax request status
                this.setState((state) => ({
                    requestStatus: 'error'
                }));

                alert ("There was an error contacting Google Calendar service: : Error " + status + " , "  + json.errorMessage);
            }

        } catch (error) {
            //updating the state with ajax request status
            this.setState((state) => ({
                requestStatus: 'error'
            }));

        }
    }


    switchToEditMode(id) {
        if (id) {
            const index = findIndex(this.state.items, {id: id});

            if (index >= 0) {

                const itemToEdit = {
                    created: this.state.items[index].itemDetails.created,
                    id: this.state.items[index].itemDetails.id,
                    updated: this.state.items[index].itemDetails.updated,
                    summary: this.state.items[index].itemDetails.summary,
                    location: this.state.items[index].itemDetails.location,
                    startDateTime: this.state.items[index].itemDetails.start.dateTime,
                    endDateTime: this.state.items[index].itemDetails.end.dateTime,
                    requestStatus: "",
                    label: "Edit todo item",
                    newItem: false
                };


                //updating the state
                //changing show ro edit mode or edit to show mode
                this.setState((state) => ({
                    editMode: !state.editMode,
                    itemToEdit: itemToEdit
                }));
            }
        } else {
            const d = new Date();

            const itemToEdit = {
                created: d.toISOString(),
                id: "",
                updated: d.toISOString(),
                summary: "",
                location: "",
                startDateTime: d.toISOString(),
                endDateTime: d.toISOString(),
                requestStatus: "",
                label: "Create new todo item",
                newItem: true
            };

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
        const newState = update(this.state, {
            itemToEdit: {[e.target.name]: {$set: e.target.value} }
        });

        this.setState(() => (newState));
    };

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
                <li className="list-group-item" key={item.id}>
                    <span className="badge badge-primary">{Moment(item.itemDate).format('Do MMM YYYY, h:mm:ss a')}</span>
                    <div className="btn" onClick={() => this.loadItemDetails(item.id)}><strong>{item.itemTitle}</strong></div>
                    <button type="button" className="btn btn-danger float-right" onClick={() => this.deleteItem(item.id)}>Delete</button>



                    { details && <div>
                        <div className="m-2">

                            <div>Summary: {item.itemDetails.summary}</div>
                            <div>Location: {item.itemDetails.location}</div>

                            <div>Start: {item.itemDetails.start.dateTime}</div>
                            <div>End: {item.itemDetails.end.dateTime}</div>

                            <div className="mt-3">Creation date: {Moment(item.itemDetails.created).format('Do MMM YYYY, h:mm:ss a')}</div>
                            <div>Updated: {Moment(item.itemDetails.updated).format('Do MMM YYYY, h:mm:ss a')}</div>
                        </div>
                        <button type="button" className="btn btn-secondary m-2" onClick={() => this.switchToEditMode(item.id)}>Edit</button>
                    </div>}

                </li>
            )
        });

        const itemToEdit = this.state.itemToEdit;

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
                        <h2>{itemToEdit.label}</h2>
                        <EditForm viewMode={this.switchToShowMode.bind(this)} itemToEdit={itemToEdit} updateItemToEdit={this.updateItemToEdit} />
                    </div>

                </div>
            </div>
        );
    }
}

export default ToDoList;