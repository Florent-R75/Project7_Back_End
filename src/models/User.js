module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg:'le nom est déjà pris'
        },
        validate: {
          notNull: { msg: 'Un nom ne peut pas être nul' },
          notEmpty: { msg: 'Un nom ne peut pas être vide' },
          isAlphanumeric: {
            msg: 'Un nom ne peut pas contenir de caractères spéciaux',
          },
          len: {
            args: [2, 25],
            msg: 'Un nom doit contenir au minimum 2 caractères et au maximum 25 caractères ',
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Un mot de passe ne peut pas être nul' },
          notEmpty: { msg: 'Un mot de passe ne peut pas être vide' },

          len: {
            args: [2, 100],
            msg: 'Un nom doit contenir au minimum 2 caractères et au maximum 25 caractères ',
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: true,
    }
  );
};

