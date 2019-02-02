module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      
        user_name: DataTypes.STRING, 
        user_password: DataTypes.STRING, 
        
    });

    User.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.Imageapi, {
          onDelete: "cascade"
        });
      };
  
    return User;
  };