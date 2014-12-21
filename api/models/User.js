/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema : true,  //to prevent saving non attributes to d/b

  attributes: {
    firstname: {
      type: 'string',
      required: true
    } ,
    lastname: {
      type: 'string',
      required: true
    } ,
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    encryptedPassword : {
      type: 'string'
    },
    // to prevent client from seeing attributes that should be hidden
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encrypedPassword;
      delete obj._csrf;
      // is there another way to get rid of this globally?
      delete obj.id;
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  }
};
