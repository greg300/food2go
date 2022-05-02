  function submitPressed() {
    const username = document.getElementById("loginform").elements["username"].value;
    const password = document.getElementById("loginform").elements["password"].value;

    const body = "username=" + username + "&password=" + password;

    console.log(body)

    fetch("http://localhost:5001/food2go-56aac/us-central1/app/api/login/customers?" + body, {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "GET"
}).then(function (response) {
    // The API call was successful!
    if(response.status == 200){
      alert("Successfully logged in!");
      console.log(response);
      return 1;
    }
    else{
      alert("Failed to log in. Incorrect username or password.")
      return 0;
    }
    return response;
  }).then(function (data) {
    // This is the JSON from our response
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  }