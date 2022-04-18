const dbRef = firebase.database().ref();
const foodsRef = dbRef.child('foods');

const foodListUI = document.getElementById("foodList");

foodsRef.on("child_added", snap => {
   let food = snap.val();
   let $li = document.createElement("li");
   $li.innerHTML = food.name;
   $li.setAttribute("child-key", snap.key); 
   $li.addEventListener("click", userClicked)
   foodListUI.append($li);
});

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