'use strict'

// had enabled by egg
// exports.static = true;
module.exports = {
validate: {
  enable: true,
  package: 'egg-validate'
},

graphql: {
  enable: true,
  package: 'egg-graphql'
},

cors: {
  enable: true,
  package: 'egg-cors'
},

mongoose: {
  enable: true,
  package: 'egg-mongoose',
},

jwt:{
  enable: true,
  package: "egg-jwt"
},

bcrypt: {
  enable: true,
  package: 'egg-bcrypt'
},

// redis: {
//   enable: true,
//   package: 'egg-redis',
// },
}