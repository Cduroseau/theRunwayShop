module.exports = function(sequelize, DataTypes) {
    const Imageapi = sequelize.define("Imageapi", {
      
        user_id: DataTypes.INTEGER,
        category: DataTypes.STRING, 
        year: DataTypes.INTEGER, 
        city: DataTypes.STRING,
        designer: DataTypes.STRING,
        imagename: DataTypes.STRING,
    });
  
    Imageapi.associate = function(models) {
       
        Imageapi.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Imageapi;
  };
  