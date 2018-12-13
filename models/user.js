module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING
    },
    company_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false
    }
  });

  /* User.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      User.hasMany(models.User_info, {
        onDelete: "cascade"
      });
    };*/
  return User;
};
