$(document).ready(function() {
  $(document).on("click", ".signupbtn", submitSignup);

  function submitSignup(event) {
    event.preventDefault();

    var isFormValid = true;
    //Check to see if all the field are filled
    $("#signup-form input").each(function() {
      if ($.trim($(this).val()).length === 0) {
        isFormValid = false;
      }
    });
    if (!isFormValid) {
      alert("Please fill in all the fields");
    } else if (isFormValid) {
      //id association from the sign up page
      var userFullName = $("#full-name");
      var companyName = $("#company-name");
      var email = $("#email");
      var password = $("#password");
      //variable for store all inputs in the signup page
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
      console.log("the user sign up post" + JSON.stringify(data));
      //post the data
      $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/newuser",
        data: JSON.stringify(data)
      });
    }
  }
  $(".cancelbtn").on("click", function(event) {
    event.preventDefault();
    //return to the main page
    window.location = "/";
  });
});
