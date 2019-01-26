var db = require('../config');
var Promise = require('bluebird');
var bcrypt = Promise.promisify(require('bcrypt-nodejs').bcrypt);



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: () => {
    this.on('creating', function (model, attrs, options) {
      bcrypt.hash(model.get('password'), null).then((hash) => {
        model.set('password', hash);
      }).catch((err) => {
        console.log(err);
      });
    });
  }
});
module.exports = User;