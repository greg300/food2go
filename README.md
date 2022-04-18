# ECE568_Team4
Software Engineering of Web Applications Team Project.

## Team Members:

Gregory Giovannini – <gregory.giovannini@rutgers.edu>

Gagan Gowda Madaiah – <gagan.gm@rutgers.edu>

Nicholas Meegan – <nicholas.meegan@rutgers.edu>

Yue Wang – <yw450@scarletmail.rutgers.edu>

---

## About
This repository includes code to represent a takeout & delivery management system for a restaurant, built with Google Firebase and Node.js.

## How to Run
### Backend
1. Install latest stable release of Node.js (if not installed already) and Firebase CLI (`npm install -g firebase-tools`).

2. To deploy locally, run `npm run serve` from within "functions".

3. Use either `curl` (sample requests included in `curl_examples.txt`) or *Postman* (sample request collection included at `Food2Go.postman_collection.json`, can be imported into *Postman*) to test API functions.

4. View Firebase Realtime Database at https://console.firebase.google.com/project/food2go-56aac/database/food2go-56aac-default-rtdb/data (need to request access from one of the contributors).

### Frontend
1. To view the menu contents and test the "Read All Food Items" (`/api/read/foods`) API, first follow the instructions in the above `Backend` section, then open `public/menu.html` in a browswer.

2. To register a new customer and test the "Create New Customer" (`/api/create/customers`) API, follow the instructions in `Backend`, then open `public/create_customer.html`.
