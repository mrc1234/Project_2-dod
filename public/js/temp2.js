$(document).ready(function() {
  //id association from the sign up page
  var userFullName = $("#full-name");
  var companyName = $("#company-name");
  var email = $("#email");
  var password = $("#password");

  var data = {
    name: userFullName.val().trim(),
    company_name: companyName.val().trim(),
    email: email.val().trim(),
    password: password.val().trim()
  };

  $(document).on("click", ".signupbtn", submitSignup);

  function submitSignup(event) {
    event.preventDefault();
    console.log("the user sign up post" + JSON.stringify(data));
    //this may not work , need to refer to the apiRoutes foe correct api url
  }
  $(".cancelbtn").on("click", function(event) {
    event.preventDefault();
    //use the get mehtod to return to the main page
  });
});
