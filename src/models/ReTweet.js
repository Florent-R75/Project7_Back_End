module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ReTweet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
      require: null,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      require: null,
    }
    
  });
};
