// const Sequelize = require('sequelize');

// module.exports = async () => {
//   const User = require('../models/User');

//   const errorHandler = (err) => {
//     console.log(err);
//   };

//   const user = await User.create({ nom: 'ala', password: '12345678' }).catch(
//     errorHandler
//   );

//   const users = await User.findAll({ where: { nom: 'ala' } }).catch(
//     errorHandler
//   );

//   console.log('User ala');
// };
