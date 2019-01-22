module.exports = {

    to_do_items_get : function(req, res){

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

        async function getToDoItemsList() {

            try {
                const resp = await calendar.events.list({
                    auth: oauth2Client,
                    calendarId: 'primary'
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