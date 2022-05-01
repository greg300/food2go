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

// Create new Customer.
app.post('/api/create/customers', (req, res) => {
    console.log(req.body);
    (async () => {
        try {
            db.ref('customers/' + req.body['username']).set( {
                password: req.body['password'],
                email: req.body['email'],
                name: req.body['name'],
                phone: req.body['phone']
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

// Create new Food item.
app.post('/api/create/foods', (req, res) => {
  console.log(req.body);
  (async () => {
      try {
          db.ref('foods/' + req.body['food_item_id']).set( {
              name: req.body['name'],
              description: req.body['description'],
              price: req.body['price'],
              availability: true,
              price_knock: 0
          });
          return res.status(200).send();
      } catch (error) {
          console.log(error);
          return res.status(500).send(error);
      }
    })();
});


// --- READ ---
// Read all Orders (optionally supply a Customer ID to filter by a given Customer).
app.get('/api/read/orders/', (req, res) => {
    var customer_id = req.query['customer_id'];
    console.log(customer_id);
    (async () => {
        try {
            var result = [];
            db.ref('orders/').once('value').then(function(snapshot) {
                if (customer_id == undefined) {  // If no Customer was supplied to filter results.
                    console.log(snapshot.val());
                    return res.status(200).send(snapshot.val());
                }
                snapshot.forEach(function(orderSnapshot) {
                    var order = orderSnapshot.val();
                    if (order.customer_id === customer_id) {
                        result.push(order);
                    }
                });
                console.log(result);
                return res.status(200).send(result);
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

// Read all Food Items.
app.get('/api/read/foods', (req, res) => {
    console.log(req.body);
    (async () => {
        try {
            db.ref('foods/').once('value').then(function(snapshot) {
                console.log(snapshot.val());
                return res.status(200).send(snapshot.val());
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

// View Cart.
/* Returns: Map object(s) { food_item_id => {count, details} }
   Example: 
    Map(3) {
     'testFood01' => {
      count: 3,
      details: {
        availability: true,
        description: 'This is Food Item 01',
        name: 'Test Food 01',
        price: 6.3,
        price_knock: 0
      }
    },
    'testFood02' => {
      count: 1,
      details: {
        availability: true,
        description: 'This is Food Item 02',
        name: 'Test Food 02',
        price: 9
      }
    },
    'testFood03' => {
      count: 2,
      details: {
        availability: false,
        description: 'This is Food Item 03',
        name: 'Test Food 03',
        price: 9
      }
    }
  }*/
app.get('/api/customers/:username/cart/details', (req, res) => {
    var username = req.param("username");
    console.log(username);
    (async () => {
        try {
            db.ref('customers/' + username).once('value').then(function(snapshot){
                if (!snapshot.hasChild('cart')){
                    // If there is not yet a "cart" field existed for this customer
                    msg = "Your cart is empty."
                    console.log(msg);
                    return res.status(200).send();
                }
                else{
                    cart = snapshot.child('cart').val();
                    map_id_to_count = new Map(Object.entries(cart))

                    ids = Array.from(map_id_to_count.keys());
                    for (let id of ids){
                        db.ref('foods/' + id).once('value').then(function(snapshot){
                            count = map_id_to_count.get(id);
                            details = snapshot.val();
                            map_id_to_count.set(id, {count, details})
                            console.log(map_id_to_count);
                        })
                    }
                    res.status(200).send(map_id_to_count);
                    return;
                }
        });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });


// --- UPDATE ---
// Update Employee.
app.patch('/api/update/employees/:employee_id', (req, res) => {
    var employee_id = req.param("employee_id");
    console.log(employee_id);
    (async () => {
        try {
            if(req.body['password']){
              db.ref('employees/' + employee_id).update( {
                password: req.body['password']});  
            }
            if(req.body['email']){
              db.ref('employees/' + employee_id).update( {
                email: req.body['email']});  
            }
            if(req.body['name']){
              db.ref('employees/' + employee_id).update( {
                name: req.body['name']});  
            }
            if(req.body['phone']){
              db.ref('employees/' + employee_id).update( {
                phone: req.body['phone']});  
            }
            if(req.body['position']){
              db.ref('employees/' + employee_id).update( {
                position: req.body['position']});  
            }
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

// Update Customer.
app.patch('/api/update/customers/:username', (req, res) => {
    var username = req.param("username");
    console.log(username);
    (async () => {
        try {
            if(req.body['password']){
              db.ref('customers/' + username).update( {
                password: req.body['password']});  
            }
            if(req.body['email']){
              db.ref('customers/' + username).update( {
                email: req.body['email']});  
            }
            if(req.body['name']){
              db.ref('customers/' + username).update( {
                name: req.body['name']});  
            }
            if(req.body['phone']){
              db.ref('customers/' + username).update( {
                phone: req.body['phone']});  
            }
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

// Add Food Item into Cart.
/* req.params: [username], [food_item_id], [count] */
app.patch('/api/update/customers/:username/cart/add', (req, res) => {
    var username = req.param("username");
    var item_id = req.param("food_item_id");
    var add_count = Number(req.param("count")); // Count input of the selected item.
    console.log(username);    
    console.log(item_id);
    console.log(add_count);
    (async () => {
        try{
            db.ref('customers/' + username).once('value').then(function(snapshot){
                if (!snapshot.hasChild('cart')){
                    // If there is not yet a "cart" field existed for this customer
                    snapshot.ref.update({
                        cart:{
                            [item_id]: add_count
                        }
                    })
                }
                else{
                    if (!snapshot.child('cart').hasChild(item_id)){
                        // If the selected Food item is NOT in the cart
                        snapshot.child('cart').ref.update({
                            [item_id]: add_count
                        });
                    }else{
                        // If the selected Food item is in the cart
                        new_count = snapshot.child('cart').child(item_id).val() + add_count;
                        snapshot.child('cart').ref.update({
                            [item_id]: new_count
                        })
                    }
                }
        });
        return res.status(200).send();
        } catch (error){
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// Remove Food Item from cart (or decrement the mapped Count by 1).
app.patch('/api/update/customers/:username/cart/remove', (req, res) => {
    var username = req.param("username");
    var item_id = req.param("food_item_id");
    console.log(username);    
    console.log(item_id);
    (async () => {
        try{
            db.ref('customers/' + username + '/cart').once('value').then(function(snapshot){
                count = snapshot.child(item_id).val();
                if (count > 1){
                    snapshot.ref.update({
                        [item_id]: count - 1
                    })
                }else{
                    snapshot.ref.child(item_id).remove();
                }
            })
        return res.status(200).send();
        } catch (error){
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });


// --- DELETE ---
// Delete Employee.
app.delete('/api/delete/employees/:employee_id', (req, res) => {
    var employee_id = req.param("employee_id");
    console.log(employee_id);
    (async () => {
        try {
            db.ref('employees/' + employee_id).remove();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

// Delete Customer.
app.delete('/api/delete/customers/:username', (req, res) => {
    var username = req.param("username");
    console.log(username);
    (async () => {
        try {
            db.ref('customers/' + username).remove();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

  // Delete Food item.
app.delete('/api/delete/foods/:food_item_id', (req, res) => {
    var food_item_id = req.param("food_item_id");
    console.log(food_item_id);
    (async () => {
        try {
            db.ref('foods/' + food_item_id).remove();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });

exports.app = functions.https.onRequest(app);