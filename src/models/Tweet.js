module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    
    
    
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: true
  })
}