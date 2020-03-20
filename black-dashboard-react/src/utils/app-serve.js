var admin = require("firebase-admin");
var express = require('express');
var bodyParser = require('body-parser')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var app = express();
app.use(bodyParser.json())

var FCM = require('fcm-node');
var serverKey = require('./tot-cafe-key.json')
var fcm = new FCM(serverKey)

var serviceAccount = require("./tot-cafe-key.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://databaseName.firebaseio.com"
});


app.get('/', (req, res) => {
    res.send('Hey there');
})

app.post('/notification', (req, res) => {
    var token = req.body.token
    var message = {
        to : token,
        notification : {
          title: req.body.title,
          body: req.body.message
        }
    };
    fcm.send(message, function(err, response){
        if(err){
            res.send(JSON.stringify({message: "Notification not Sent", status_code : 401}))
        }else {
            res.send(JSON.stringify({message: "Notification Sent", status_code : 200}))
        }
    })
})

app.post('/mail', (req, res) => {
    const msg = {
        to: req.body.to,
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.title,
        html: `<strong>${req.body.body}</strong>`,
    };
    sgMail.send(msg);
    res.send(JSON.stringify({message: "Email Sent", status_code : 200}))
})

app.listen(3030, function(error) {
    if (error) {
        console.log("Something went wrong", error)
    } else {
        console.log("Listening")
    }
})
