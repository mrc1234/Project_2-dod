$(document).ready(function() {
  //ids association from the sign up page
  var companyName = $("#company-name");
  var position = $("#position");
  var phoneNumber = $("#phone-number");
  var employeesNumber = $("#number-workers");
  var establishedYear = $("#year-established");
  var officeNumber = $("#office-number");
  var socialMedia = $("#social-media");
  var website = $("#website");
  var webPlatform = $("textarea#position");
  //capture the yes or no answer; error it only shows true even  select no
  var ownServer = $("input[name=own_server]:radio");
  var onsite = $("input[name=server_onsite]:radio");
  var cloudServer = $("input[name=cloud_server]:radio");
  var dataCollection = $("input[name=collect_user_data]:radio");

  $("#survey-submit").on("click", function(event) {
    event.preventDefault();
    var surveyData = {
      company_name: companyName.val().trim(),
      position: position.val().trim(),
      phone_number: phoneNumber.val().trim(),
      number_workers: employeesNumber.val().trim(),
      year_established: establishedYear.val().trim(),
      office_number: officeNumber.val().trim(),
      social_media: socialMedia.val().trim(),
      website: website.val().trim(),
      plate_form: webPlatform.val().trim(),
      own_server: ownServer.val().trim(),
      server_onsite: onsite.val().trim(),
      cloud_server: cloudServer.val().trim(),
      collect_user_data: dataCollection.val().trim()
    };
    console.log(surveyData);
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newinfo",
      data: JSON.stringify(surveyData)
    });
  });
});
