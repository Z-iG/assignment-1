/**
 * Created by Igor on 1/17/2019.
 */
import Moment from "moment";

import isEmpty from "lodash.isempty";
import validator from 'validator';
import classnames from 'classnames';






function validateInput(data) {
    let errors = {};

    if (validator.isEmpty(data.summary)){
        errors.summary = 'This field is required'
    }

    if (!validator.isEmail(data.organizerEmail)){
        errors.organizerEmail = 'This field must be a valid email'
    }

    if (validator.isEmpty(data.status)){
        errors.status = 'This field is required'
    }

    /*if (validator.isISO8601(data.startDateTime)){
        errors.startDateTime = 'This field must be a date in ISO8601 format'
    }*/


    return {
        errors,
        isValid: isEmpty(errors)
    };
}



class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        /*this.setField = this.setField.bind(this);*/

        //this.handleChange = this.handleChange.bind(this);

        /*this.state = {
            created: new Date(),
            id: "",
            updated: new Date(),
            summary: "",
            organizerEmail: "",
            status: "",
            startDateTime: new Date()
        }*/

        //this.state = this.props.itemToEdit;

        /*this.state = {
            created: this.props.itemToEdit.created,
            id: this.props.itemToEdit.id,
            updated: this.props.itemToEdit.updated,
            summary: this.props.itemToEdit.summary,
            // organizerEmail: this.props.itemToEdit.organizer.email,
            status: this.props.itemToEdit.status,
            // startDateTime: this.props.itemToEdit.start.dateTime,
            requestStatus: ""
        }*/

        this.state = {
            errors: {},
            requestStatus: ""
        }
    }

    isValid() {
        //const { errors, isValid } = validateInput(this.state);//
        const { errors, isValid } = validateInput(this.props.itemToEdit);
        if (!isValid){
            this.setState({ errors });
        } else {this.setState( {errors: {}} )}
        return isValid;
    }


    /*componentWillReceiveProps(nextProps) {
        if (nextProps.itemToEdit !== this.props.itemToEdit) {
            this.setState({
                created: nextProps.itemToEdit.created,
                id: nextProps.itemToEdit.id,
                updated: nextProps.itemToEdit.updated,
                summary: nextProps.itemToEdit.summary,
                organizerEmail: nextProps.itemToEdit.organizer.email,
                status: nextProps.itemToEdit.status,
                startDateTime: nextProps.itemToEdit.start.dateTime,
                requestStatus: ""
            });
        }
    }*/

    handleSubmit(e) {

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

        if (this.isValid()) {
            //const data = e.target;//state.itemsTodit

            //const data = this.state.itemToEdit;
            //const data = this.state;
            const data = this.props.itemToEdit;

            console.log('data');
            console.log(data);


            //updating the state
             this.setState(() => ({
                 requestStatus: "requesting"
             }));


            // this.props.setRequestStatus("requesting");

            let method ="PUT";
            if (data.newItem) {method = "POST"}

            fetch('http://localhost:3000/api/v1/to-do-item', {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(checkStatus)
                .then(parseJSON)

                .then(function (data) {

                    //updating the state
                    this.setState((prevState) => ({
                        requestStatus: 'done'
                    }));
                    // this.props.setRequestStatus("done");


                    console.log('request succeeded with JSON response', data)
                }.bind(this))

                //.then(this.props.viewMode())

                .catch(function (error) {

                    this.props.viewMode();

                    //updating the state
                    this.setState(() => ({
                        requestStatus: "error"
                    }));

                    //this.props.setRequestStatus("error");


                    //console.log('request failed', error)

                }.bind(this))
        }
    }

    /*setField (e) {
        this.setState({[e.target.name]: e.target.value})
    }*/




    render (){
        const itemToEdit = this.props.itemToEdit;
        const updateItemToEdit = this.props.updateItemToEdit;

        //const setRequestStatus = this.props.setRequestStatus;

        /*const itemToEdit = this.state;*/

        const { errors } = this.state;

        const InputFieldGroup = ({ name, value, label, error, type }) => {
            return (
                <div className={classnames('form-group m-2', { 'is-invalid"': error })}>
                    <label htmlFor={name}>{label}</label>
                    <input
                        type={type}
                        name={name}
                        className="form-control mx-sm-3"
                        value={value}
                    />
                    {error && <span className="help-block">{error}</span>}
                </div>
            );
        }

        InputFieldGroup.defaultProps = {
            type: 'text'
        }

        return(
            <form onSubmit={this.handleSubmit} onChange={updateItemToEdit} className="form-inline">
            {/*<form onSubmit={this.handleSubmit} onChange={this.setField} className="form-inline">*/}
                <div className="form-group m-2">
                    <label htmlFor="created">Creation date:</label>
                    <div className="mx-sm-3">{Moment(itemToEdit.created).format('Do MMM YYYY, h:mm:ss a')}</div>
                </div>

                <div className="form-group m-2">
                    <label htmlFor="updated">Updated:</label>
                    {/*<input type="text" id="updated" className="form-control mx-sm-3" value={Moment(itemToEdit.updated).format('Do MMM YYYY, h:mm:ss a')} />*/}
                    <div className="mx-sm-3">{Moment(itemToEdit.updated).format('Do MMM YYYY, h:mm:ss a')}</div>
                </div>

                {/*<div className="form-group m-2">
                    <label htmlFor="summary">Summary:</label>
                    <input type="text" name="summary" className="form-control mx-sm-3" value={itemToEdit.summary} />
                </div>*/}

                <InputFieldGroup
                    name="summary"
                    label="Summary:"
                    value={itemToEdit.summary}
                    error={errors.summary}
                />

                {/*<div className="form-group m-2">
                    <label htmlFor="organizerEmail">Organizer email:</label>
                    <input type="text" name="organizerEmail" className="form-control mx-sm-3" value={itemToEdit.organizerEmail} />
                </div>*/}

                <InputFieldGroup
                    name="organizerEmail"
                    label="Organizer email:"
                    value={itemToEdit.organizerEmail}
                    error={errors.organizerEmail}
                />


                {/*<div className="form-group m-2">
                    <label htmlFor="status">Status:</label>
                    <input type="text" name="status" className="form-control mx-sm-3" value={itemToEdit.status} />
                </div>*/}

                <InputFieldGroup
                    name="status"
                    label="Status:"
                    value={itemToEdit.status}
                    error={errors.status}
                />


                <div className="form-group m-2">
                    <label htmlFor="startDateTime">Start:</label>
                    <input type="text" name="startDateTime" className="form-control mx-sm-3" value={itemToEdit.startDateTime} />
                </div>

                <button type="submit" className="btn btn-primary m-2">Save</button>

            </form>
        )

    }



}

export default EditForm;

//Moment(itemToEdit.startDateTime).format('DD/MM/YYYY hh:mm:ss')