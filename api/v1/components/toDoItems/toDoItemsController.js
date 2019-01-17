/**
 * Created by Igor on 12/13/2018.
 */
module.exports = {

    to_do_items_get : function(req, res){



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

        /*calendar.events.list({
         auth: oauth2Client,
         calendarId: 'primary',
         }, function(err, res) {
         if (err) {
         console.log(err);
         } else {
         console.log(res.data);
         }
         });*/

        async function getToDoItemsList() {

            try {
                const resp = await calendar.events.list({
                    auth: oauth2Client,
                    calendarId: 'primary'
                });

                var respToDoItemsList = resp.data.items;

                var limitedDataToDoItemsList = respToDoItemsList.map(obj => ({
                        id: obj.id,
                        itemTitle: obj.summary,
                        itemDate: obj.start.dateTime,
                        itemDetails: {}
                    })
                );


                res.status(201).json({toDoItems: limitedDataToDoItemsList});
            } catch (error){
                console.log(error);
                res.status(500).json({error: error})

            }
        }

        getToDoItemsList();

    }

    /*,

     to_do_items_delete : function(req, res){


     res.status(200).json("Successfully deleted!");

     }*/

};