module.exports = function(sequelize, DataTypes) {
  var User_info = sequelize.define("information", {
    //company's name
    company_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    //position in the company
    position: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    //user's phone number
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    //number of workers
    number_workers: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 1
      }
    },
    //established year of the company
    year_established: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    //company's office number
    office_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 1
      }
    },
    //what social meida the company uses
    social_media: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    //the company's website
    website: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    //what platform(s) the company uses
    platform: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    //whether the company has own server
    own_server: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true
      }
    },
    //whether the company has server onsite
    server_onsite: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true
      }
    },
    //does the company use cloud server
    cloud_server: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true
      }
    },
    //does the company collects user data
    collect_user_data: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true
      }
    }
  });
  return User_info;
};
