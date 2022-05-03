function checkStrength(){
    console.log("Calling checkstrength");
    const password = document.getElementById("signupform").elements["password"].value;
    if(password.length >= 8){
      document.getElementById("signupform").elements["password"].style.backgroundColor = 'chartreuse';
      return 1;
    }
    else{
      document.getElementById("signupform").elements["password"].style.backgroundColor = 'red';
      return 0;
    }
  }

  function checkEqual(){
    console.log("Calling checkequal");
    const password = document.getElementById("signupform").elements["password"].value;
    const passwordconfirm = document.getElementById("signupform").elements["confPwd"].value;
    if(password === passwordconfirm && password.length >= 8){
      document.getElementById("signupform").elements["confPwd"].style.backgroundColor = 'chartreuse';
      return 1;
    }
    else
    {
      document.getElementById("signupform").elements["confPwd"].style.backgroundColor = 'red';
      return 0;
    }
  }

 async function checkUsernameExistence()
  {
    console.log("calling checkusername");
    document.getElementById("signupform").addEventListener("click", function(event){
    event.preventDefault()
    });
    const username = "username=" + document.getElementById("signupform").elements["username"].value;
    if(username.length == 0){ return 0; }
    return fetch("http://localhost:5001/food2go-56aac/us-central1/app/api/read/customers/", {
      body: username,
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      }).then(function (response) {
    // The API call was successful!
    return response.status;
  }).then(function (data) {
    if(data == 200){
      console.log("New username");
      return 1;
    }
    else{
     console.log("Username exists in db");
     return 0;
    }
    // This is the JSON from our response
    
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
  }

  function resetFields(){
    document.getElementById("signupform").elements["name"].style.backgroundColor = 'white';
    document.getElementById("signupform").elements["email"].style.backgroundColor = 'white';
    document.getElementById("signupform").elements["phone"].style.backgroundColor = 'white';
    document.getElementById("signupform").elements["username"].style.backgroundColor = 'white';
    document.getElementById("signupform").elements["password"].style.backgroundColor = 'white';
    document.getElementById("signupform").elements["confPwd"].style.backgroundColor = 'white';
  }

  async function submitPressed() {
    result = await checkUsernameExistence();
    document.getElementById("signupform").addEventListener("click", function(event){
    event.preventDefault()
    });
    const name = document.getElementById("signupform").elements["name"].value;
    const email = document.getElementById("signupform").elements["email"].value;
    const phone = document.getElementById("signupform").elements["phone"].value;
    const username = document.getElementById("signupform").elements["username"].value;
    const password = document.getElementById("signupform").elements["password"].value;

    if(username === "" || email === "" || phone === "" || name === "" || password === ""){
      alert("One or more fields are not populated.");
      return
    }

    if(result == 0){
      alert("Account with this username already exists. Please choose a different username.");
      return
    }

    if(checkStrength() == 0){
      alert("Password is not strong enough. Please enter a password with 8 or more characters.");
      return
    }

    if(checkEqual() == 0){
      alert("Password and Password Confirmation do not match.");
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