// Imports & initialization.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

// Authorization initialization.
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://food2go-56aac-default-rtdb.firebaseio.com"
});
const db = admin.database();

// --- APIs ---
// Test server status.
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});


// Create new Order.
app.post('/api/create/orders', (req, res) => {
    console.log(req.body);
    (async () => {
        try {
            db.ref('employee/' + req.body['id']).set( {
                id: req.body['id'],
                name: req.body['item']
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });


// Create new Employee.
app.post('/api/create/employees', (req, res) => {
    console.log(req.body);
    (async () => {
        try {
            db.ref('employees/' + req.body['employee_id']).set( {
                //employee_id: req.body['employee_id'],
                password: req.body['password'],
                email: req.body['email'],
                name: req.body['name'],
                phone: req.body['phone'],
                position: req.body['position']
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

exports.app = functions.https.onRequest(app);
