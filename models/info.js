module.exports = function(sequelize, DataTypes) {
  var User_info = sequelize.define("information", {
    company_name: DataTypes.STRING ,
    position: DataTypes.STRING,
    phone_number:DataTypes.INTEGER,
    number_workers:  DataTypes.INTEGER,
    year_established:  DataTypes.INTEGER,
    office_number:  DataTypes.INTEGER,
    social_media: DataTypes.BOOLEAN,
    website:DataTypes.BOOLEAN,
    plate_form: DataTypes.BOOLEAN,
    own_server:DataTypes.BOOLEAN,
    server_onsite: DataTypes.BOOLEAN,
    cloud_server: DataTypes.BOOLEAN,
    collect_user_data:DataTypes.BOOLEAN
  });
  return User_info;
};
