module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        isUnique :true,
        allowNull:false,
        validate:{
            isEmail : true
        }
    },
    password: {
        type: DataTypes.STRING,
        isUnique :true,
        allowNull:false,
    }
    });
  
 
  
    return User;
  };
  