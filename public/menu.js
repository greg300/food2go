const foodListUI = document.getElementById("foodList");
const apiURL = 'http://localhost:5001/food2go-56aac/us-central1/app/api';

function userClicked(e) {

  const foodDetailUI = document.getElementById("foodDetail");

}

function displayData(data) {

  for (const val in data) {
      const foodListUI = document.createElement("ul");
      let li = document.createElement("li");
      let li2 = document.createElement("li");
      let li3 = document.createElement("li");
      let li4 = document.createElement("li");
      li.appendChild(document.createTextNode(data[val]['name']));
      li2.appendChild(document.createTextNode(data[val]['description']));
      li3.appendChild(document.createTextNode(data[val]['availability']));
      li4.appendChild(document.createTextNode(data[val]['price']));
      foodListUI.appendChild(li);
      foodListUI.appendChild(li2);
      foodListUI.appendChild(li3);
      foodListUI.appendChild(li4);
      foodListDiv.appendChild(foodListUI);
  }
}

function readFoods () {
  fetch(`${apiURL}/read/foods`).then(function (response) {
    // The API call was successful!
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    displayData(data);
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}

readFoods();

const foodDetailUI = document.getElementById("foodDetail");
        let p = document.createElement('p');
        let detailDesc = document.getElementById("detailDesc");
        detailDesc.innerHTML = "Description: " + data[val]['description'];
        let detailAvail = document.getElementById("detailAvail");
        detailAvail.innerHTML = "Availability: " + data[val]['availability'];
        let detailPrice = document.getElementById("detailPrice");
        detailPrice.innerHTML = "Price: " + data[val]['price'];