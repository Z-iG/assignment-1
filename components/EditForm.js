import Moment from "moment";
import isEmpty from "lodash.isempty";
import validator from "validator";
import classnames from "classnames";
import PropTypes from "prop-types";

//Validate client side form input.
function validateInput(data) {
    let errors = {};

    if (validator.isEmpty(data.summary)){
        errors.summary = 'This field is required'
    }

    if (validator.isEmpty(data.location)){
        errors.location = 'This field is required'
    }

    if (!validator.isRFC3339(data.startDateTime)){
        errors.startDateTime = 'This field must be a valid RFC 3339 date  in YYYY-MM-DD format'
    }

    if (!validator.isRFC3339(data.endDateTime)){
        errors.endDateTime = 'This field must be a valid RFC 3339 date in YYYY-MM-DD format'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}


class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            errors: {},
            requestStatus: ""
        }
    }

    static propTypes = {
        itemToEdit: PropTypes.object.isRequired,
        updateItemToEdit: PropTypes.func.isRequired
    };


    //PropTypes.shape({
    //  summary:PropTypes.string,
    // }).isRequired

    isValid() {
        const { errors, isValid } = validateInput(this.props.itemToEdit);
        if (!isValid){
            this.setState({ errors });
        } else {this.setState( {errors: {}} )}
        return isValid;
    }

    handleSubmit(e) {

        function checkStatus(response) {
            if(response.ok) {
                return response
            } else {
                let error = new Error();

                alert ("There was an error contacting Google Calendar service: : Error " + response.error.code + " , "  + response.errorMessage);

                throw error
            }
        }

        function parseJSON(response) {
            return response.json()
        }

        e.preventDefault();

        if (this.isValid()) {
            const data = this.props.itemToEdit;

            //updating the state with ajax request status
             this.setState(() => ({
                 requestStatus: "requesting"
             }));

            let method ="PUT";
            if (data.newItem) {method = "POST"}

            fetch('http://localhost:3000/api/v1/to-do-item', {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(parseJSON)
                .then(checkStatus)


                .then(function (data) {

                    //updating the state with ajax request status
                    this.setState((prevState) => ({
                        requestStatus: 'done'
                    }));

                    //console.log('request succeeded with JSON response', data)
                }.bind(this))

                //.then(this.props.viewMode())

                .catch(function (error) {
                    this.props.viewMode();

                    //updating the state with ajax request status
                    this.setState(() => ({
                        requestStatus: "error"
                    }));

                }.bind(this))
        }
    }

    render (){
        const itemToEdit = this.props.itemToEdit;
        const updateItemToEdit = this.props.updateItemToEdit;
        const { errors } = this.state;

        const InputFieldGroup = ({ name, value, label, error, type }) => {
            return (
                <div className={classnames('form-group m-2', { 'is-invalid"': error })}>
                    <label htmlFor={name}>{label}</label>
                    <input
                        type={type}
                        name={name}
                        className="form-control mx-sm-3"
                        defaultValue={value}
                    />
                    {error && <span className="help-block">{error}</span>}
                </div>
            );
        };

        InputFieldGroup.defaultProps = {
            type: 'text'
        };

        return(
            <form onSubmit={this.handleSubmit} onChange={updateItemToEdit} className="form-inline">

                <InputFieldGroup
                    name="summary"
                    label="Summary:"
                    value={itemToEdit.summary}
                    error={errors.summary}
                />

                <InputFieldGroup
                    name="location"
                    label="Location:"
                    value={itemToEdit.location}
                    error={errors.location}
                />

                <InputFieldGroup
                    name="startDateTime"
                    label="Start:"
                    value={itemToEdit.startDateTime}
                    error={errors.startDateTime}
                />

                <InputFieldGroup
                    name="endDateTime"
                    label="End:"
                    value={itemToEdit.endDateTime}
                    error={errors.endDateTime}
                />

                <div className="form-group m-2">
                    <label htmlFor="created">Creation date:</label>
                    <div className="mx-sm-3">{Moment(itemToEdit.created).format('Do MMM YYYY, h:mm:ss a')}</div>
                </div>

                <div className="form-group m-2">
                    <label htmlFor="updated">Updated:</label>
                    <div className="mx-sm-3">{Moment(itemToEdit.updated).format('Do MMM YYYY, h:mm:ss a')}</div>
                </div>

                <button type="submit" className="btn btn-primary m-2">Save</button>

            </form>
        )

    }



}

export default EditForm;