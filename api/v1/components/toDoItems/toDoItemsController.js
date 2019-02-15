module.exports = {

    to_do_items_get : function(req, res){

        const config = require('config');
        const {google} = require('googleapis');
        const calendar = google.calendar('v3');
        const privatekey = require("../../privatekey.json"); //service account private key

        //configure a JWT auth client
        let jwtClient = new google.auth.JWT(
            privatekey.client_email,
            null,
            privatekey.private_key,
            config.scope_google_api //['https://www.googleapis.com/auth/calendar.events']
        );

        async function getToDoItemsList() {

            try {
                //Google calendar API
                const resp = await calendar.events.list({
                    auth: jwtClient,
                    calendarId: config.google_calendar_id //'zig.m800@gmail.com'
                });

                const respToDoItemsList = resp.data.items;

                let limitedDataToDoItemsList = respToDoItemsList.map(obj => ({
                        id: obj.id,
                        itemTitle: obj.summary,
                        itemDate: obj.start.dateTime,
                        itemDetails: {}
                    })
                );

                res.status(201).json({toDoItems: limitedDataToDoItemsList});
            } catch (err) {
                const errorCode = err.response.data.error.code;
                const errorMessage = err.response.data.error.message;
                const error = err.response.data.error;

                res.status(errorCode).json({error: error, errorMessage: errorMessage})
            }
        }

        return getToDoItemsList();

    }
};