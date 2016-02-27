var bcrypt = require('bcrypt');

module.exports = {

connection: "mysql",

  attributes: {
  	email: {
  		type: 'email',
      required: 'true',
      unique: true
  	},
  	password: {
      type: 'string',
      required: 'true'
    },
  	avatar: 'string',
  	roles: {
      collection: 'Roles',
      via: 'user_id'
    },
    project_all: {
      collection: 'Project',
      via: 'user_all'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  // Encriptar Password antes de Guardar en la BD.
  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      })
    })
  },

  comparePassword: function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {
      if (err) cb(err);
      if (match) {
          cb(null, true);
      } else {
          cb(err);
      }
    })
  }
};

