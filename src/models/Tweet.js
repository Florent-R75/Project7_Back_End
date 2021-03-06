module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Tweet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 300],
          msg: 'Un Tweet doit contenir au minimum 2 caractères et au maximum 300 caractères ',
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      require: null,
    },
  });
};
