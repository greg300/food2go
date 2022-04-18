function checkStrength(){
    const password = document.getElementById("signupform").elements["password"].value;
    if(password.length >= 8){
      document.getElementById("signupform").elements["password"].style.backgroundColor = 'chartreuse';
    }
    else{
      document.getElementById("signupform").elements["password"].style.backgroundColor = 'white';
    }
  }

  function checkEqual(){
    const password = document.getElementById("signupform").elements["password"].value;
    const passwordconfirm = document.getElementById("signupform").elements["confPwd"].value;
    if(password === passwordconfirm){
      document.getElementById("signupform").elements["confPwd"].style.backgroundColor = 'chartreuse';
    }
    else
    {
      document.getElementById("signupform").elements["confPwd"].style.backgroundColor = 'red';
    }
  }

  function submitPressed() {
    console.log("Here!");
    const name = document.getElementById("signupform").elements["name"].value;
    const email = document.getElementById("signupform").elements["email"].value;
    const phone = document.getElementById("signupform").elements["phone"].value;
    const username = document.getElementById("signupform").elements["username"].value;
    const password = document.getElementById("signupform").elements["password"].value;

    if(username === "" || email === "" || phone === "" || name === "" || password === ""){
      alert("One or more fields are not populated.");
      return
    }

    const body = "username=" + username + "&password=" + password + "&email=" + email + "&name=" + name + "&phone=" + phone;

    fetch("http://localhost:5001/food2go-56aac/us-central1/app/api/create/customers", {
        body: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      }).then(function (response) {
    // The API call was successful!
    console.log(response);
    return response;
  }).then(function (data) {
    // This is the JSON from our response
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  }