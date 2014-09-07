/**
 * Created by Juul on 05/09/14.
 */
var bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); // this is syncronous (future: async)
};

/*UserSchema.methods.generateHash = function(password, done) {
    bcrypt.hash(password, 8, function(err, res){
        if(err) return done(err);
        done(res);
    });

    // this is syncronous (future: async)
};*/

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password); // this is syncronous (future: async)
};

module.exports = mongoose.model('User', UserSchema);