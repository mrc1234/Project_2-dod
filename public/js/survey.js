$(document).ready(function () {
  //ids association from the sign up page
  var companyName = $("#company-name");
  var position = $("#position");
  var phoneNumber = $("#phone-number");
  var employeesNumber = $("#number-workers");
  var establishedYear = $("#year-established");
  var officeNumber = $("#office-number");
  var socialMedia = $("#social-media");
  var website = $("#website");
  var webPlatform = $("textarea#platform");

  $("#survey-submit").on("click", function (event) {
    event.preventDefault();
    //capture the selected yes or no answers
    var ownServer = $("input[name=own_server]:checked").val();
    var onsite = $("input[name=server_onsite]:checked").val();
    var cloudServer = $("input[name=cloud_server]:checked").val();
    var dataCollection = $("input[name=collect_user_data]:checked").val();
    // get upload file name -- 'prep' obtains files property
    var uploadFileName = $("#upload-file").prop("files")[0];
    var keyName = uploadFileName.name;
    //declare a variable to save all the stored inputs
    var surveyData = {
      company_name: companyName.val().trim(),
      position: position.val().trim(),
      phone_number: phoneNumber.val().trim(),
      number_workers: employeesNumber.val().trim(),
      year_established: establishedYear.val().trim(),
      office_number: officeNumber.val().trim(),
      social_media: socialMedia.val().trim(),
      website: website.val().trim(),
      platform: webPlatform.val().trim(),
      own_server: ownServer,
      server_onsite: onsite,
      cloud_server: cloudServer,
      collect_user_data: dataCollection,
      uploadFileName: uploadFileName,
      keyName: keyName
    };
    console.log(surveyData);
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newinfo",
      data: JSON.stringify(surveyData)
    }).done(function (data) {
      window.location.replace("result");
      console.log(data);
    });

    // upload file to AWS (the code is in apiRoutes.js)    
    var queryURL = "/api/upload";
    $.ajax({
      url: queryURL,
      method: "POST"
    }).then(function (response) {
      console.log(response);
    });
  });
});

//module.exports.keyName = keyName;