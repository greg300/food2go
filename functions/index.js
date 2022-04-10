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

// --- TESTING ---
// Test server status.
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

// --- CREATE ---
// Create new Order.
app.post('/api/create/orders', (req, res) => {
    console.log(req.body);
    (async () => {
        try {
            db.ref('orders/' + req.body['order_id']).set( {
                //order_id: req.body['order_id'],
                customer_id: req.body['customer_id'],
                status: req.body['status'],
                items: req.body['items'],
                price: req.body['price'],
                coupons: req.body['coupons'],
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


// --- READ ---
// Read all Orders.
app.get('/api/read/orders', (req, res) => {
    console.log(req.body);
    (async () => {
        try {
            db.ref('orders/').once('value').then(function(snapshot) {
                console.log(snapshot.val())
            })
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

exports.app = functions.https.onRequest(app);
