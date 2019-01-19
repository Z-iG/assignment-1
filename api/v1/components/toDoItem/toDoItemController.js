/**
 * Created by Igor on 12/13/2018.
 */

module.exports = {

    to_do_item_get : function(req, res){

        var config = require('config');
        const {google} = require('googleapis');
        const calendar = google.calendar('v3');
        var oauth2Client = new google.auth.OAuth2(
            config.googleAuthOAuth2.client_id, //client ID
            //"1043071528710-n2phgsri3kv404jk2gbidq7td9pfms3p.apps.googleusercontent.com", //client ID

            config.googleAuthOAuth2.client_secret //client secret
            //"ijrtYotMhRLC65l3w54nEkgi" //client secret
        );
        oauth2Client.setCredentials({
            refresh_token: config.googleAuthOAuth2.refresh_token //refresh token
            //refresh_token: "1/9NGvFU4dWPwlf0QuQ_7eSnmbLntUEHz1uooRFbSGX84", //refresh token

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
    },

    to_do_item_delete: function(req, res){
        console.log('DELETE req received');
        console.log(req.params.id);

        res.status(200).end();
    },

    to_do_item_create: function(req, res){

        console.log('POST req received');
        console.log(req.body);

        var config = require('config');
        const {google} = require('googleapis');
        const calendar = google.calendar('v3');
        var oauth2Client = new google.auth.OAuth2(
            config.googleAuthOAuth2.client_id, //client ID
            config.googleAuthOAuth2.client_secret //client secret
        );
        oauth2Client.setCredentials({
            refresh_token: config.googleAuthOAuth2.refresh_token //refresh token
        });

        async function createToDoItem(event) {
            try {
                const gcRes = await calendar.events.insert({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    resource: event
                });
                console.log(gcRes.data); //todo

                //todo what data do I have to have in a response?
                res.status(201).end();

            } catch (error) {
                console.log(error);
                res.status(500).json({error: error})
            }
        }

         // created: '2019-01-18T07:01:52.449Z',
         // id: '',
         // updated: '2019-01-18T07:01:52.449Z',
         // summary: 'Send email to HR88',
         // organizerEmail: 'm800@gmail.com',
         // status: 'confirmed',
         // startDateTime: '2019-01-18T07:01:52.449Z',
         // requestStatus: '',
         // label: 'Create new todo item',
         // newItem: true


        var summary = req.body.summary

        var event = {
            'summary': summary,
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2019-01-28T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
            },
            'end': {
                'dateTime': '2019-01-28T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
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

        createToDoItem(event);







        res.status(201).end();
    },

    to_do_item_update: function(req, res){
        console.log('PUT req received');
        console.log(req);

        res.status(200).end();
    }


};