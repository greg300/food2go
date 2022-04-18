// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCzSw2RqMAzxT8nxmzGbca_n-OaoSzSj5U",
//   authDomain: "food2go-56aac.firebaseapp.com",
//   databaseURL: "https://food2go-56aac-default-rtdb.firebaseio.com",
//   projectId: "food2go-56aac",
//   storageBucket: "food2go-56aac.appspot.com",
//   messagingSenderId: "912146962405",
//   appId: "1:912146962405:web:ba727c4ba777ab82ce410c",
//   measurementId: "G-SMDE1KW84D"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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