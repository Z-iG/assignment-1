module.exports = {

    to_do_item_get : function(req, res){

        const config = require('config');
        const {google} = require('googleapis');
        const calendar = google.calendar('v3');
        let oauth2Client = new google.auth.OAuth2(
            config.googleAuthOAuth2.client_id,
            config.googleAuthOAuth2.client_secret
        );
        oauth2Client.setCredentials({
            refresh_token: config.googleAuthOAuth2.refresh_token
            // access_token: "#####" // If you want to use access token, please use this.
        });

        async function getToDoItemDetails(eventId) {
            try {
                let gcRes = await calendar.events.get({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    eventId: eventId
                });

                res.status(201).json({itemDetails: gcRes.data});

            } catch (err) {
                const errorCode = err.response.data.error.code;
                const errorMessage = err.response.data.error.message;
                const error = err.response.data.error;

                res.status(errorCode).json({error: error, errorMessage: errorMessage})
            }
        }

        const id = req.query.id;

        return getToDoItemDetails(id);
    },

    to_do_item_delete: function(req, res){

        const config = require('config');
        const {google} = require('googleapis');
        const calendar = google.calendar('v3');
        let oauth2Client = new google.auth.OAuth2(
            config.googleAuthOAuth2.client_id,
            config.googleAuthOAuth2.client_secret
        );
        oauth2Client.setCredentials({
            refresh_token: config.googleAuthOAuth2.refresh_token
            // access_token: "#####" // If you want to use access token, please use this.
        });

        async function deleteToDoItem(eventId) {
            try {
                let gcRes = await calendar.events.delete({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    eventId: eventId
                });

                res.status(200).end();

            } catch (err) {
                const errorCode = err.response.data.error.code;
                const errorMessage = err.response.data.error.message;
                const error = err.response.data.error;

                res.status(errorCode).json({error: error, errorMessage: errorMessage})
            }
        }

        const id = req.params.id;

        return deleteToDoItem(id);
    },

    to_do_item_create: function(req, res){


        var validator = require('validator');
        var isEmpty = require('lodash.isempty');
        var config = require('config');
        var {google} = require('googleapis');
        var calendar = google.calendar('v3');
        var oauth2Client = new google.auth.OAuth2(
            config.googleAuthOAuth2.client_id,
            config.googleAuthOAuth2.client_secret
        );
        oauth2Client.setCredentials({
            refresh_token: config.googleAuthOAuth2.refresh_token
        });

        async function createToDoItem(event) {
            try {
                const gcRes = await calendar.events.insert({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    resource: event
                });

                res.status(201).end();

            } catch (err) {
                const errorCode = err.response.data.error.code;
                const errorMessage = err.response.data.error.message;
                const error = err.response.data.error;

                res.status(errorCode).json({error: error, errorMessage: errorMessage})
            }
        }

        const summary = req.body.summary;
        const location = req.body.location;
        const startDateTime = req.body.startDateTime;
        const endDateTime = req.body.endDateTime;

        const event = {
            'summary': summary,
            'location': location,
            'description': 'description here',
            'start': {
                'dateTime': startDateTime,
                'timeZone': 'Asia/Hong_Kong',
            },
            'end': {
                'dateTime': endDateTime,
                'timeZone': 'Asia/Hong_Kong',
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
                {'email': 'm800me1@example.com'},
                {'email': 'm800me2@example.com'},
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                ],
            },
        };

        //Validate server side form input.
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


        const { errors, isValid } = validateInput(req.body);
        if (isValid){
            return createToDoItem(event);
        } else {
            return res.status(400).json({error: errors, errorMessage: "Invalid input parameters"});
        }

    },

    to_do_item_update: function(req, res){

        var validator = require('validator');
        var isEmpty = require('lodash.isempty');
        var config = require('config');
        var {google} = require('googleapis');
        var calendar = google.calendar('v3');
        var oauth2Client = new google.auth.OAuth2(
            config.googleAuthOAuth2.client_id,
            config.googleAuthOAuth2.client_secret
        );
        oauth2Client.setCredentials({
            refresh_token: config.googleAuthOAuth2.refresh_token
        });

        async function updateToDoItem(eventId, event) {
            try {
                const gcRes = await calendar.events.update({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    eventId: eventId,
                    resource: event
                });


                //console.log(gcRes.data);


                res.status(201).end();

            } catch (err) {
                const errorCode = err.response.data.error.code;
                const errorMessage = err.response.data.error.message;
                const error = err.response.data.error;

                res.status(errorCode).json({error: error, errorMessage: errorMessage})
            }
        }

        const eventId = req.body.id;
        const summary = req.body.summary;
        const location = req.body.location;
        const startDateTime = req.body.startDateTime;
        const endDateTime = req.body.endDateTime;

        const event = {
            'summary': summary,
            'location': location,
            'description': 'description here',
            'start': {
                'dateTime': startDateTime,
                'timeZone': 'Asia/Hong_Kong',
            },
            'end': {
                'dateTime': endDateTime,
                'timeZone': 'Asia/Hong_Kong',
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
                {'email': 'm800me1@example.com'},
                {'email': 'm800me2@example.com'},
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                ],
            },
        };

        //Validate server side form input.
        function validateInput(data) {
            let errors = {};

            if (validator.isEmpty(data.id)){
                errors.id = 'This field is required'
            }

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

        const { errors, isValid } = validateInput(req.body);
        if (isValid){
            return updateToDoItem(eventId, event);
        } else {
            return res.status(400).json({error: errors, errorMessage: "Invalid input parameters"});
        }
    }


};

