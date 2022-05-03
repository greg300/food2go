
  function submitPressed() {
    document.getElementById("loginform").addEventListener("click", function(event){
    event.preventDefault()
    });
    const username = document.getElementById("loginform").elements["username"].value;
    const password = document.getElementById("loginform").elements["password"].value;
    const body = "username=" + username + "&password=" + password;

    console.log(body)

    fetch("http://localhost:5001/food2go-56aac/us-central1/app/api/login/customers", {
  body: body,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST"
}).then(function (response) {
    // The API call was successful!
    return response.status;
  }).then(function (data) {
    // This is the JSON from our response
      if(data == 200){
      alert("Successfully logged in!");
      console.log(data);
      return 1;
    }
    else{
      alert("Failed to log in. Incorrect username or password.")
      return 0;
    }
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  }