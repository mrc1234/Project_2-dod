$(document).ready(function () {
  $(document).on("click", ".loginbtn", submitLogin);

  function submitLogin(event) {
    event.preventDefault();

    var isFormValid = true;
    //Check to see if all the field are filled
    $("#login-form input").each(function () {
      if ($.trim($(this).val()).length === 0) {
        isFormValid = false;
      }
    });
    if (!isFormValid) {
      alert("Please fill in all the fields");
    } else if (isFormValid) {

      //id association from the login page
      var loginEmail = $("#login-email");
      var loginPassword = $("#login-password");
     
      // See if login email and password are in user database
  //Get 
  
    
      // Getting references to our form and inputs
      var loginForm = $("form.login");
      var emailInput = $("input#email-input");
      var passwordInput = $("input#password-input");

      // When the form is submitted, we validate there's an email and password entered
      loginForm.on("submit", function (event) {
        event.preventDefault();
        var userData = {
          email: loginEmail.val().trim(),
          password: loginPassword.val().trim()
        };

        if (!userData.email || !userData.password) {
          return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
      });

      // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
      function loginUser(email, password) {
        $.post("/api/login", {
          email: email,
          password: password
        }).then(function (data) {
          window.location.replace(data);
          // If there's an error, log the error
        }).catch(function (err) {
          console.log(err);
        });
      }

    });
