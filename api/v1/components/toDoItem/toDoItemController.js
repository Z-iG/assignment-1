/**
 * Created by Igor on 12/13/2018.
 */
module.exports = {

    to_do_item_get : function(req, res){

        const {google} = require('googleapis');
        const calendar = google.calendar('v3');
        var oauth2Client = new google.auth.OAuth2(
            "1043071528710-n2phgsri3kv404jk2gbidq7td9pfms3p.apps.googleusercontent.com", //client ID
            "ijrtYotMhRLC65l3w54nEkgi" //client secret
        );
        oauth2Client.setCredentials({
            refresh_token: "1/9NGvFU4dWPwlf0QuQ_7eSnmbLntUEHz1uooRFbSGX84", //refresh token
            // access_token: "#####" // If you want to use access token, please use this.
        });

        async function getToDoItemDetails(eventId) {
            try {
                const gcRes = await calendar.events.get({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    eventId: eventId
                });
                console.log(gcRes.data);

                //todo what data do I have to have in a response?
                res.status(201).json({itemDetails: gcRes.data});

            } catch (error) {
                console.log(error);
                res.status(500).json({error: error})
            }
        }

        const id = req.query.id;
        //const {id} = req.query;

        getToDoItemDetails(id); //'2nu0d21cibmfkq05agsfc71mpd'
    }


    //,

};