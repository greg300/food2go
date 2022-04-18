
const foodListUI = document.getElementById("foodList");

// foodsRef.on("child_added", snap => {
//    let food = snap.val();
//    let $li = document.createElement("li");
//    $li.innerHTML = food.name;
//    $li.setAttribute("child-key", snap.key); 
//    $li.addEventListener("click", userClicked)
//    foodListUI.append($li);
// });

function userClicked(e) {

    var foodID = e.target.getAttribute("child-key");
  
    const foodRef = foodsRef.child('foods/' + foodID);
  
    const foodDetailUI = document.getElementById("foodDetail");
    foodDetailUI.innerHTML = ""
  
    foodRef.on("child_added", snap => {
      var $p = document.createElement("p");
      $p.innerHTML = snap.key + " - " + snap.val()
      foodDetailUI.append($p);
    });
  
}

function readFoods () {
  fetch('http://localhost:5001/food2go-56aac/us-central1/app/api/read/foods').then(function (response) {
    // The API call was successful!
    console.log('123');
    return response.json();
  }).then(function (data) {
    // This is the JSON from our response
    console.log('456');
    console.log(data);
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}

readFoods();