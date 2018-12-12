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
  //capture the yes or no answer
  var ownServer = $("input[name=own_server]:radio").val();
  var onsite = $("input[name=server_onsite]:radio").val();
  var cloudServer = $("input[name=cloud_server]:radio").val();
  var dataCollection = $("input[name=collect_user_data]:radio").val();

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
      own_server: ownServer,
      server_onsite: onsite,
      cloud_server: cloudServer,
      collect_user_data: dataCollection
    };
   console.log(surveyData);
  });
});
